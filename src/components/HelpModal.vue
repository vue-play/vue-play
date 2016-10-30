<template>
  <SlimModal class="help-modal" :is-open="showHelp" :click-outside="toggleHelp">
    <div class="markdown-body">
      <div class="shortcut">
        <kbd>Command Shift L</kbd> <span>Toggle Left Panel</span>
      </div>
      <div class="shortcut">
        <kbd>Command Shift D</kbd> <span>Toggle Down Panel</span>
      </div>
      <div class="shortcut">
        <kbd>Command Shift K</kbd> <span>Toggle All Panel</span>
      </div>
    </div>
    <div class="actions">
      <button class="button" @click="toggleHelp">Close</button>
    </div>
  </SlimModal>
</template>

<script>
  import SlimModal from 'vue-slim-modal'
  import {mapGetters, mapActions} from 'eva.js'

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
