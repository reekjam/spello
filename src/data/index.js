import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

module.exports = {
  word: 'set',
  getRandomWord () {
    Vue.http.jsonp('http://randomword.setgetgo.com/get.php').then(response => {
      this.word = response.data.Word
    })
    return this.word
  }
}
