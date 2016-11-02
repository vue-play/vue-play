<template>
  <slim-modal
    :style="{padding: 0}"
    :overlay-style="{backgroundColor: 'rgba(0, 0, 0, 0.74902)'}"
    class="help-modal"
    :is-open="showHelp"
    :click-outside="toggleHelp">
    <h2 class="modal-header">
      Shortcuts
    </h2>
    <div class="modal-body">
      <div class="shortcut">
        <span class="kbd">Command/Ctrl + Shift + L</span>
        <span class="desc">Toggle Left Panel</span>
      </div>
      <div class="shortcut">
        <span class="kbd">Command/Ctrl + Shift + D</span>
        <span class="desc">Toggle Down Panel</span>
      </div>
      <div class="shortcut">
        <span class="kbd">Command/Ctrl + Shift + K</span>
        <span class="desc">Toggle All Panels</span>
      </div>
      <div class="shortcut">
        <span class="kbd">Command/Ctrl + Shift + ←</span>
        <span class="desc">Play Previous Example</span>
      </div>
      <div class="shortcut">
        <span class="kbd">Command/Ctrl + Shift + →</span>
        <span class="desc">Play Next Example</span>
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
  .help-modal {
    border-radius: 3px;
    width: 400px;
  }
  .modal-header, .modal-body, .modal-footer {
    padding: 15px 20px;
    border-bottom: 1px solid #e2e2e2;
  }
  .modal-header {
    margin: 0;
  }
  .modal-footer {
    border-bottom: none;
  }
  .shortcut {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    display: flex;
    font-size: 12px;
    span {
      border: solid 1px #ccc;
      padding: 8px;
      background-color: #f9f9f9;
      box-shadow: none;
      border-radius: 3px 0 0 3px;
    }
    .kbd {
      border-right: none;
    }
    .desc {
      background-color: white;
      border-radius: 0 3px 3px 0;
      min-width: 160px;
    }
  }
</style>
