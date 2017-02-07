<template>
  <h2 v-if='playing'>
    Spell, spell, spell.
  </h2>
  <h2 v-else>
    Type "ready" to begin.
  </h2>
</template>

<script>
  export default {
    props: [ 'playing' ]
  }
</script>
