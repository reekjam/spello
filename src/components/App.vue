<template>
  <div id='app'>
    <div class='main'>

      <div v-if='gameOver'>
        <game-over v-bind:click-handler='resetGame' :score='score' :formattedSeconds='formattedSeconds'/>
      </div>

      <div v-else>
        <game-form :playing='playing' :wrong='wrong' :strikes='strikes' :word='word' :elapsed-seconds='elapsedSeconds' :previous-word='previousWord'/>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import GameOver from './GameOver'
  import GameForm from './GameForm'

  export default {
    computed: {
      ...mapState([
        'word',
        'entry',
        'playing',
        'wrong',
        'strikes',
        'elapsedSeconds',
        'previousWord',
        'score'
      ]),
      ...mapGetters([
        'gameOver',
        'formattedSeconds'
      ])
    },
    methods: {
      resetGame () {
        this.$store.commit('resetGame')
      }
    },
    components: {
      GameOver, GameForm
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Noto+Serif");

  html, body {
    font-family: 'Noto Serif';
    background: skyblue;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #app {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  .main {
    flex-direction: column;
  }
</style>
