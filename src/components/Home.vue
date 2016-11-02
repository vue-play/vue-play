<template>
  <div class="app">
    <help-modal></help-modal>
    <sidebar></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  import AppMain from './AppMain.vue'
  import HelpModal from './HelpModal.vue'

  export default {
    name: 'home',
    components: {
      Sidebar,
      AppMain,
      HelpModal
    }
  }
</script>

<style src="../css/main.css"></style>
