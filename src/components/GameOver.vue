<template>
  <h1 v-on:click='clickHandler'>Game over. Try again?</h1>
</template>

<script>
  export default {
    props: [ 'clickHandler' ]
  }
</script>

<style>
  .game-over {
    cursor: pointer;
  }
</style>
