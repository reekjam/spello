<template>
  <div>
    <h1 v-on:click='clickHandler' class='game-over'>Game over. Try again?</h1>
    <p>You spelled {{ formattedMessage }} correctly in {{ formattedSeconds }}.</p>
  </div>
</template>

<script>
  export default {
    props: [ 'clickHandler', 'score', 'formattedSeconds' ],
    computed: {
      formattedMessage () {
        const score = this.score

        if (score > 1) {
          return `${score} words`
        } else {
          return `${score} word`
        }
      }
    }
  }
</script>

<style>
  .game-over {
    cursor: pointer;
    border-right: .15em solid white;
    white-space: nowrap;
    overflow: hidden;
    animation:
      typing 4s steps(30, end),
      blink-cursor .75s step-end infinite;
  }

  @keyframes typing {
    0% { width: 0 }
    50% { width: 52%; }
    70% { width: 52%; }
    100% { width: 100%; }
  }

  @keyframes blink-cursor {
    from, to { border-color: transparent }
    50% { border-color: white }
  }
</style>
