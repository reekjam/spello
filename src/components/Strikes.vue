<template>
  <div class='strikes error'>
    <span v-for='strike in strikes'> . </span>
  </div>
</template>

<script>
  export default {
    props: [ 'strikes' ]
  }
</script>

<style>
  .error {
    height: 3em;
    color: crimson;
    overflow: hidden;
  }

  .strikes {
    margin-top: 2em;
    font-size: 1.5em;
  }
</style>
