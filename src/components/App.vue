<template>
  <div id="app" class="app">
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import keyEvents from '../utils/key-events'
  import {mapGetters} from 'eva.js'

  export default {
    components: {
      Sidebar
    },
    mounted() {
      keyEvents(this.$store)
    },
    computed: {
      ...mapGetters(['currentPlayspot'])
    },
    watch: {
      currentPlayspot: 'changeRoute'
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style src="hint.css/hint.css"></style>
<style>
  html, body, .app {
    height: 100%;
  }
  body {
    margin: 0;
    font: 14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
  .app {
    display: flex;
  }
  .main {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .play-ground {
    height: 100%;
    padding: 10px;
    overflow: auto;
    flex: 1;
  }
  .resize-indicator {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 80px;
    background-color: rgba(51, 51, 51, 0.78);
    color: white;
    border-radius: 3px;
    padding: 5px;
    text-align: center;
    z-index: 9999;
  }
</style>
