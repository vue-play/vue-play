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
    padding: 10px;
    width: calc(100% - 280px);
  }
</style>
