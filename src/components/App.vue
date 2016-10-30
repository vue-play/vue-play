<template>
  <div id="app" class="app">
    <sidebar></sidebar>
    <div class="main" :style="{width: mainWidth}">
      <div class="view">
        <iframe class="play-ground" ref="iframe" src="/#/__preview" frameborder="0"></iframe>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import keyEvents from '../utils/key-events'
  import {mapGetters, mapActions} from 'eva.js'

  export default {
    components: {
      Sidebar
    },
    data() {
      return {
        iframeLoaded: false
      }
    },
    mounted() {
      keyEvents(this.$store)
      this.updateIframe(this.$route.path)
      this.listenChild()
      if (this.$route.name === 'default') {
        this.updatePlayspot(this.$route.path)
      }
    },
    watch: {
      currentPlayspot: 'updateRoute'
    },
    computed: {
      ...mapGetters([
        'currentPlayspot',
        'mainWidth'
      ])
    },
    methods: {
      ...mapActions([
        'addActionLog',
        'clearActionLogs',
        'updatePlayspot'
      ]),
      updateRoute(route) {
        // do not add browser history in iframe
        if (this.$route.name !== 'preview') {
          this.$router.push(route)
        }
      },
      updateIframe(route) {
        const {iframe} = this.$refs
        const updateIframeRoute = () => {
          if (this.$route.name !== 'default') return
          iframe.contentWindow.postMessage({
            type: 'UPDATE_ROUTE',
            payload: route
          }, location.origin)
          document.title = `${this.$route.meta.name} - Vue Play`
        }
        if (this.iframeLoaded) {
          updateIframeRoute()
        } else {
          iframe.onload = () => {
            updateIframeRoute()
            this.iframeLoaded = true
          }
        }
      },
      listenChild() {
        window.addEventListener('message', ({data}) => {
          if (data.type === 'ACTION_LOG') {
            this.addActionLog({
              data: data.payload,
              path: this.currentPlayspot
            })
            const consoleEl = document.querySelector('.console-body')
            if (consoleEl) {
              this.$nextTick(() => {
                consoleEl.scrollTop = consoleEl.scrollHeight
              })
            }
          } else if (data.type === 'CLEAR_ACTION_LOGS') {
            this.clearActionLogs(this.currentPlayspot)
          }
        })
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
