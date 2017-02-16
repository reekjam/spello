<template>
  <div class='stats-container'>
    <div>
      <span>
        {{ formattedSeconds }}
      </span>
    </div>
    <div>
      <span>
        {{ previousWord }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'formattedSeconds', 'previousWord' ]
  }
</script>

<style>
  .stats-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 20%;
  }
</style>
