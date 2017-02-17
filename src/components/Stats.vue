<template>
  <div class='stats-container'>
    <div>
      <span>
        {{ formattedSeconds }}
      </span>
    </div>
    <div>
      <transition name='slide' mode='out-in'>
        <div :key='previousWord' id='prevWord'>
          {{ previousWord }}
        </div>
      </transition>
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

  .slide-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  .slide-enter-active {
    transition: all .1s ease;
    opacity: 1;
  }

  .slide-leave {
    opacity: 1;
  }

  .slide-leave-active {
    transition: all .1s ease;
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
