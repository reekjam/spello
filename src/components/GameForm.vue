<template>
  <div>
    <stats :formatted-seconds='formattedSeconds' :previous-word='previousWord'/>

    <form v-on:submit.prevent='compareWords'>

      <instructions :playing='playing'/>

      <word :word='word' :on-click='speak'/>

      <div class='error'>
        <p v-if='wrong'>Wrong.</p>
      </div>

      <input type="text" v-on:input='updateEntry'/>
      <button>Enter</button>

      <strikes :strikes='strikes'/>
    </form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Speech from 'speak-tts'
  import Instructions from './Instructions'
  import Word from './Word'
  import Strikes from './Strikes'
  import Stats from './Stats'

  const speechConfig = { lang: 'en-US', pitch: '1.1' }
  Speech.init(speechConfig)

  export default {
    props: [
      'playing',
      'word',
      'wrong',
      'strikes',
      'elapsedSeconds',
      'previousWord'
    ],
    computed: {
      formattedSeconds () {
        let minutes = Math.floor(this.elapsedSeconds / 60)
        let seconds = ('0' + this.elapsedSeconds % 60).slice(-2)
        return `${minutes}:${seconds}`
      }
    },
    methods: {
      ...mapMutations([
        'getRandomWord',
        'correctEntry',
        'incorrectEntry'
      ]),
      compareWords () {
        if (this.$store.state.entry === this.$store.state.word) {
          this.correctEntry()
          this.getNewWord()
          this.setPreviousWord(this.$store.state.entry)
        } else {
          this.incorrectEntry()
        }
        this.clearInput()
      },
      clearInput () {
        document.getElementsByTagName('input')[0].value = ''
      },
      getNewWord () {
        this.$store.dispatch('getRandomWord').then(() =>
          this.speak()
        )
      },
      updateEntry (e) {
        this.$store.commit('updateEntry', e.target.value)
      },
      speak () {
        Speech.speak({text: this.$store.state.word})
      },
      updateElaspedSeconds () {
        this.$store.commit('updateElapsedSeconds')
      },
      startTimer () {
        setInterval(this.updateElaspedSeconds, 1000)
      },
      setPreviousWord (word) {
        this.$store.commit('setPreviousWord', word)
      }
    },
    components: {
      Instructions, Word, Strikes, Stats
    },
    mounted () {
      this.startTimer()
    }
  }
</script>

<style>
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
</style>
