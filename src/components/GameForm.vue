<template>
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
</template>

<script>
  import { mapMutations } from 'vuex'
  import Speech from 'speak-tts'

  const speechConfig = { lang: 'en-US', pitch: '1.1' }
  Speech.init(speechConfig)

  export default {
    props: [
      'playing',
      'word',
      'wrong',
      'strikes'
    ],
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
      }
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
