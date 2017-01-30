<template>
  <div id='app'>
    <div v-if='gameOver'>
      <game-over v-bind:click-handler='restart' class='game-over'/>
    </div>
    <div v-else>
      <form v-on:submit.prevent='compareWords'>
        <h2>Type the word below:</h2>

        <span id='word'>
          {{ wordBank[index % wordBank.length] }}
        </span>

        <div class='error'>
          <p v-if='wrong'>Wrong.</p>
        </div>

        <input type="text" v-model='entry'/>
        <button>Enter</button>

        <div class='strikes error'>
          <span v-for='strike in strikes'> . </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
        ],
        index: 0,
        entry: '',
        wrong: false,
        strikes: 0
      }
    },
    computed: {
      gameOver () {
        return this.strikes >= 3
      }
    },
    methods: {
      compareWords () {
        if (this.entry === this.wordBank[this.index % this.wordBank.length]) {
          this.index++
          this.wrong = false
        } else {
          this.wrong = true
          this.strikes++
        }
        this.clearInput()
      },
      clearInput () {
        this.entry = ''
      },
      restart () {
        this.wrong = false
        this.strikes = 0
        this.clearInput()
      }
    },
    components: {
      'game-over': {
        props: ['clickHandler'],
        template: "<h1 v-on:click='clickHandler'>Game over. Try again?</h1>"
      }
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Noto+Serif");

  html, body {
    font-family: 'Noto Serif';
    background: skyblue;
    color: white;
  }

  input, button {
    font-size: 1em;
    height: 2em;
  }

  input {
    width: 20em;
    padding: 0;
    border: 0;
  }

  button {
    border: 1px solid white;
    background: transparent;
    color: white;
    margin-left: 1em;
    padding: 0em 1em;
    cursor: pointer;
  }

  #app {
    text-align: center;
  }

  #word {
    animation: blinker 1s linear infinite;
    font-size: 2.5em;
  }

  .error {
    height: 3em;
    color: crimson;
    overflow: hidden;
  }

  .game-over {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .strikes {
    margin-top: 2em;
    font-size: 1.5em;
  }

  @keyframes blinker {
    50% {opacity: .5;}
  }
</style>
