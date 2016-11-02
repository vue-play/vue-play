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
  import keyEvents from 'utils/key-events'

  export default {
    name: 'home',
    components: {
      Sidebar,
      AppMain,
      HelpModal
    },
    mounted() {
      keyEvents(this.$store)
    }
  }
</script>

<style src="../css/main.css"></style>
