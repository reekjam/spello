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
    strikes: 0
  },
  mutations: {
    newGame (state) {
      state.word = 'ready'
      state.playing = false
      state.wrong = false
      state.strikes = 0
      state.clearInput()
    },
    updateEntry (state, entry) {
      state.entry = entry
    },
    getRandomWord (state) {
      Vue.http.jsonp('http://randomword.setgetgo.com/get.php').then(response => {
        state.word = response.data.Word
        console.log('in getRandomWord', state.word)
      })
    }
  }
})
