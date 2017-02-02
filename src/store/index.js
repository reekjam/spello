let Vue = require('vue')
let Vuex = require('vuex')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    word: 'ready',
    index: 0,
    entry: '',
    playing: false,
    wrong: false,
    strikes: 0
  }
})
