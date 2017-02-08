<template>
  <div class='word-container' v-on:click.prevent='onClick'>
    <transition name='reveal' mode='out-in'>
      <p id='word' :key='word'>{{ word }}</p>
    </transition>
  </div>
</template>

<script>
  export default {
    props: [ 'word', 'onClick' ]
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
