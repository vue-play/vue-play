<template>
  <div class="main" :style="{width: mainWidth}">
    <device-toolbar v-if='showDeviceToolbar' />
    <div class="view">
      <iframe :style='{width: frameSize.width, height: frameSize.height}' class="play-ground" ref="iframe" src="preview.html" frameborder="0"></iframe>
      <tabs
        v-if="current.component"
        :example="current.component.example"
        :readme="current.component.readme">
      </tabs>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import findScenario from 'utils/find-scenario'
  import {observeKeyEvents, executeShortcut} from 'utils/key-events'
  import Tabs from './Tabs.vue'
  import DeviceToolbar from './DeviceToolbar'

  export default {
    watch: {
      current: 'updateIframe'
    },
    data() {
      return {
        iframeLoaded: false
      }
    },
    mounted() {
      this.updateIframe()
      this.listenChild()
      observeKeyEvents(this.$store)
    },
    computed: {
      ...mapGetters(['mainWidth', 'showDeviceToolbar', 'frameSize']),
      current() {
        const {spot} = this.$route.query
        const {scenario, component} = findScenario(this.$store.state.app.spots, this.$route.query) || {}

        if (!component) {
          return {}
        }

        return {
          spot, scenario, component
        }
      },
      currentScenario() {
        return {
          spot: this.current.spot,
          scenario: this.current.scenario
        }
      }
    },
    methods: {
      ...mapActions(['addLog', 'updateCurrentScenario', 'setSpots']),
      postMessage() {
        this.$refs.iframe.contentWindow.postMessage({
          type: 'UPDATE_ROUTE',
          payload: this.currentScenario
        }, location.origin)
      },
      updateIframe() {
        if (this.current.scenario) {
          document.title = `${this.current.scenario} - Vue Play`
        } else {
          document.title = 'Vue Play'
        }
        this.updateCurrentScenario(this.currentScenario)
        if (this.iframeLoaded) {
          this.postMessage()
        } else {
          this.$refs.iframe.onload = () => {
            this.postMessage()
            this.iframeLoaded = true
          }
        }
      },
      listenChild() {
        window.addEventListener('message', ({data}) => {
          if (data.type === 'SET_SPOTS') {
            this.setSpots(JSON.parse(data.payload))
          }
          if (data.type === 'APPLY_SHORTCUT') {
            executeShortcut(this.$store, JSON.parse(data.payload))
          }
          if (data.type === 'ADD_LOG') {
            const {spot, scenario} = this.current
            this.addLog({
              data: data.payload,
              route: {
                spot, scenario
              }
            })
            const consoleEl = document.querySelector('.console-body')
            if (consoleEl) {
              this.$nextTick(() => {
                consoleEl.scrollTop = consoleEl.scrollHeight
              })
            }
          }
        })
      }
    },
    components: {
      Tabs, DeviceToolbar
    }
  }
</script>

<style>
  .play-button {
    border: 1px solid #ccc;
    background-color: white;
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 3px;
    outline: none;
    &:hover {
      background-color: #f9f9f9;
    }
  }
  .play-repo {
    margin-left: 10px;
    color: rgb(66, 185, 131);
    text-decoration: none;
    border-bottom: 1px solid;
    font-size: 12px;
  }
  .play-tabs {
    background-color: white;
  }
</style>
