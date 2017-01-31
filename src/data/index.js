let Vue = require('vue')
let VueResource = require('vue-resource')
Vue.use(VueResource)

module.exports = {
  word: '',
  getRandomWord () {
    Vue.http.jsonp('http://randomword.setgetgo.com/get.php').then(response => {
      this.word = response.data.Word
    })
    return this.word || 'set'
  }
}
