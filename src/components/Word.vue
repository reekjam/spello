<template>
  <div class='word-container' v-on:click.prevent='speak'>
    <transition name='reveal' mode='out-in'>
      <p id='word' :key='word'>{{ word }}</p>
    </transition>
  </div>
</template>

<script>
  import Speech from 'speak-tts'

  const speechConfig = { lang: 'en-US', pitch: '1.1' }
  Speech.init(speechConfig)

  export default {
    props: [ 'word' ],
    methods: {
      speak () {
        Speech.speak({text: this.$store.state.word})
      }
    }
  }
</script>

<style>
  #word {
    font-size: 2.5em;
    margin-bottom: 0;
  }

  .word-container {
    border-bottom: 1px solid white;
    cursor: pointer;
  }

  .reveal-enter-active {
    opacity: 0;
    transition: opacity 40s;
  }

  .reveal-leave-active {
    opacity: .1;
    transition: opacity .2s;
  }

  .reveal-enter-to {
    opacity: 1;
  }

  .reveal-leave-to {
    opacity: 0;
  }
</style>
