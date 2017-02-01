<template>
  <div id='app'>
    <div v-if='gameOver'>
      <game-over v-bind:click-handler='restart' class='game-over'/>
    </div>
    <div v-else>

      <form v-on:submit.prevent='compareWords'>
        <h2>Begin spelling:</h2>

        <div class='word-container'v-on:click.prevent='speak'>
          <p id='word' class='reveal'>{{ word }}</p>
        </div>

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
  import Speech from 'speak-tts'
  import data from './data/index.js'

  const speechConfig = { lang: 'en-US', pitch: '1.1' }
  Speech.init(speechConfig)

  export default {
    data () {
      return {
        word: 'ready',
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
      getNewWord () {
        this.word = data.getRandomWord()
        this.resetReveal()
        this.speak()
      },
      compareWords () {
        if (this.entry === this.word) {
          this.wrong = false
          this.getNewWord()
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
      },
      resetReveal () {
        let wordSpan = document.querySelector('#word')
        let wordSpanClone = document.createElement('p')
        wordSpanClone.id = 'word'
        wordSpanClone.className = 'reveal'
        wordSpanClone.innerHTML = this.word
        wordSpan.parentNode.replaceChild(wordSpanClone, wordSpan)
      },
      speak () {
        Speech.speak({text: this.word})
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #word {
    font-size: 2.5em;
    margin-bottom: 0;
  }

  .word-container {
    border-bottom: 1px solid white;
    cursor: pointer;
  }

  .reveal {
    animation: blinker 10s linear;
  }

  .error {
    height: 3em;
    color: crimson;
    overflow: hidden;
  }

  .strikes {
    margin-top: 2em;
    font-size: 1.5em;
  }

  @keyframes blinker {
    0% {opacity: 0;}
    40% {opacity: .1;}
    70% {opacity: .7;}
    100% {opacity: 1;}
  }

</style>
