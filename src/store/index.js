import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    word: 'ready',
    index: 0,
    entry: '',
    playing: false,
    wrong: false,
    strikes: 0,
    elapsedSeconds: 0,
    previousWord: ''
  },
  getters: {
    gameOver (state) {
      return state.strikes >= 3
    }
  },
  mutations: {
    resetGame (state) {
      state.word = 'ready'
      state.playing = false
      state.wrong = false
      state.strikes = 0
    },
    correctEntry (state) {
      state.playing = true
      state.wrong = false
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
      return Vue.http.jsonp('http://randomword.setgetgo.com/get.php').then(response => {
        context.commit('updateWord', response.data.Word)
      })
    }
  }
})
