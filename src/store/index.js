import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
  }
})
