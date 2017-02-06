<template>
  <div id='app'>

    <div v-if='gameOver'>
      <game-over v-bind:click-handler='newGame' class='game-over'/>
    </div>

    <div v-else>
      <form v-on:submit.prevent='compareWords'>
        <h2>{{ setInstruction }}</h2>

        <div class='word-container' v-on:click.prevent='speak'>
          <p id='word'>{{ word }}</p>
        </div>

        <div class='error'>
          <p v-if='wrong'>Wrong.</p>
        </div>

        <input type="text" @input='updateEntry'/>
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
  import {mapState} from 'vuex'

  const speechConfig = { lang: 'en-US', pitch: '1.1' }
  Speech.init(speechConfig)

  export default {
    computed: mapState({
      word: state => state.word,
      entry: state => state.entry,
      playing: state => state.playing,
      wrong: state => state.wrong,
      strikes: state => state.strikes,
      gameOver () {
        return this.strikes >= 3
      },
      setInstruction () {
        if (this.playing) {
          return 'Spell, spell, spell.'
        } else {
          return 'Type "ready" to begin.'
        }
      }
    }),
    methods: {
      updateEntry (e) {
        this.$store.commit('updateEntry', e.target.value)
      },
      getNewWord () {
        this.$store.commit('getRandomWord')
        console.log('in getNewWord', this.word)
        this.displayNewWord()
        this.speak()
      },
      compareWords () {
        if (this.$store.state.entry === this.$store.state.word) {
          this.$store.state.playing = true
          this.$store.state.wrong = false
          this.getNewWord()
        } else {
          this.$store.state.wrong = true
          this.$store.state.strikes++
        }
        this.clearInput()
      },
      clearInput () {
        document.getElementsByTagName('input')[0].value = ''
      },
      newGame () {
        this.$store.commit('newGame')
      },
      displayNewWord () {
        let wordSpan = document.querySelector('#word')
        let wordSpanClone = document.createElement('p')
        wordSpanClone.id = 'word'
        wordSpanClone.className = 'reveal'
        wordSpanClone.innerHTML = this.word
        wordSpan.parentNode.replaceChild(wordSpanClone, wordSpan)
      },
      speak () {
        Speech.speak({text: this.$store.state.word})
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
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
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
