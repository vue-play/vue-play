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
    width: calc(100% - 280px);
    height: 100%;
  }
  .view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .play-ground {
    height: calc(100% - 260px);
    padding: 10px;
    overflow: auto;
  }
</style>
