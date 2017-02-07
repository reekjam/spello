<template>
  <div id='app'>

    <div v-if='gameOver'>
      <game-over v-bind:click-handler='newGame' class='game-over'/>
    </div>

    <div v-else>
      <form v-on:submit.prevent='compareWords'>
        <instructions :playing='playing'/>

        <word :word='word'/>

        <div class='error'>
          <p v-if='wrong'>Wrong.</p>
        </div>

        <input type="text" @input='updateEntry'/>
        <button>Enter</button>

        <strikes :strikes='strikes' />
      </form>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState(['word', 'entry', 'playing', 'wrong', 'strikes']),
      ...mapGetters(['gameOver'])
    },
    methods: {
      ...mapMutations(['newGame', 'getRandomWord', 'correctEntry', 'incorrectEntry']),
      updateEntry (e) {
        this.$store.commit('updateEntry', e.target.value)
      },
      getNewWord () {
        this.$store.dispatch('getRandomWord').then(() =>
          this.speak()
        )
      },
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

</style>
