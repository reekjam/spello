// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import GameOver from './components/GameOver'
import Instructions from './components/Instructions'
import Strikes from './components/Strikes'
import Word from './components/Word'
import store from './store'

Vue.component('game-over', GameOver)
Vue.component('instructions', Instructions)
Vue.component('strikes', Strikes)
Vue.component('word', Word)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App, GameOver, Instructions, Strikes, Word }
})
