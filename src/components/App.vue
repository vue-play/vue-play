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

  export default {
    components: {
      Sidebar
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
</style>
