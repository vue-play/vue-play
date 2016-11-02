<template>
  <slim-modal :is-open="showHelp" :click-outside="toggleHelp">
    <h2 class="modal-header">
      Help
    </h2>
    <div class="markdown-body">
      <div class="shortcut">
        <kbd>Command/Ctrl + Shift + L</kbd> <span>Toggle Left Panel</span>
      </div>
      <div class="shortcut">
        <kbd>Command/Ctrl + Shift + D</kbd> <span>Toggle Down Panel</span>
      </div>
      <div class="shortcut">
        <kbd>Command/Ctrl + Shift + K</kbd> <span>Toggle All Panels</span>
      </div>
    </div>
    <div class="modal-footer">
      <button @click="toggleHelp" class="play-button">Close</button>
      <a class="play-repo" href="https://github.com/vue-play/vue-play">
        Check out vue-play on GitHub
      </a>
    </div>
  </slim-modal>
</template>

<script>
  import SlimModal from 'vue-slim-modal'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['showHelp'])
    },
    components: {
      SlimModal
    },
    methods: {
      ...mapActions(['toggleHelp'])
    }
  }
</script>

<style scoped>
  .button {
    border: 1px solid #e2e2e2;
  }
</style>
