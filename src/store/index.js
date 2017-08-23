import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    word: 'ready',
    entry: '',
    playing: false,
    wrong: false,
    strikes: 0,
    elapsedSeconds: 0,
    previousWord: '',
    score: 0,
    wordBank: [
      'antediluvian',
      'xanthosis',
      'chiaroscurist',
      'logorrhea',
      'succedaneum',
      'pococurante',
      'autochthonous',
      'appoggiatura',
      'ursprache',
      'laodicean'
    ]
  },
  getters: {
    gameOver (state) {
      return state.strikes >= 3
    },
    formattedSeconds (state) {
      let minutes = Math.floor(state.elapsedSeconds / 60)
      let seconds = ('0' + state.elapsedSeconds % 60).slice(-2)
      return `${minutes}:${seconds}`
    }
  },
  mutations: {
    resetGame (state) {
      state.word = 'ready'
      state.playing = false
      state.wrong = false
      state.strikes = 0
      state.previousWord = ''
      state.score = 0
    },
    correctEntry (state) {
      state.playing = true
      state.wrong = false
      state.score++
    },
    incorrectEntry (state) {
      state.wrong = true
      state.strikes++
    },
    setPreviousWord (state, word) {
      state.previousWord = word
    },
    updateEntry (state, entry) {
      state.entry = entry
    },
    updateWord (state, newWord) {
      state.word = newWord
    },
    updateElapsedSeconds (state) {
      if (state.playing) {
        state.elapsedSeconds += 1
      } else {
        state.elapsedSeconds = 0
      }
    }
  },
  actions: {
    getRandomWord (context) {
      return Vue.http.jsonp('https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
        context.commit('updateWord', response.data[0].word)
      })
      .catch(() => {
        context.commit('updateWord', context.state.wordBank[Math.floor(Math.random() * context.state.wordBank.length)])
      })
    }
  }
})
