<template>
  <div class='device-toolbar'>
    <a class='device' :class='{selected: selectedDevice === null}' @click='setDevice(null)'>
      <desktop-icon :size="'2em'" />
      <div>Default</div>
    </a>
    <a class='device' :class='{selected: selectedDevice === device}' v-for='device in devices' @click='setDevice(device)'>
      <mobile-icon :size="'2em'"/>
      <div>{{ device.name }}</div>
    </a>
  </div>
</template>

<script>
  import MobileIcon from './MobileIcon'
  import DesktopIcon from './DesktopIcon'
  import { mapActions} from 'vuex'

  const iPhoneUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
  const iPadUserAgent = "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";

  export default {
    data() {
      return {
        selectedDevice: null,
        devices: [
          { name: 'iPhone 4',      width: 320,  height: 480,  userAgent: iPhoneUserAgent },
          { name: 'iPhone 5',      width: 320,  height: 568,  userAgent: iPhoneUserAgent },
          { name: 'iPhone 6',      width: 375,  height: 667,  userAgent: iPhoneUserAgent },
          { name: 'iPhone 6 Plus', width: 414,  height: 736,  userAgent: iPhoneUserAgent },
          { name: 'iPad',          width: 768,  height: 1024, userAgent: iPadUserAgent   },
          { name: 'iPad Pro',      width: 1024, height: 1366, userAgent: iPadUserAgent   }
        ],
        defaultUserAgent: global.navigator.userAgent
      }
    },
    created() {
      this.defineUserAgent(global);
      this.defineUserAgent(global.document.querySelector('iframe').contentWindow);
    },
    methods: {
      ...mapActions(['setFrameSize']),
      setDevice(device) {
        this.selectedDevice = device
        if (device) {
          this.setFrameSize({ width: device.width + "px", height: device.height + "px" })
        } else {
          this.setFrameSize()
        }
      },
      defineUserAgent(window) {
        if (window.navigator) {
          const userAgentProp = { get: () => {
            return this.selectedDevice ? this.selectedDevice.userAgent : this.defaultUserAgent
          }}
          try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp)
          } catch (e) {
            window.navigator = Object.create(window.navigator, {
              userAgent: userAgentProp
            })
          }
        }
      }
    },
    components: { MobileIcon, DesktopIcon }
  }
</script>

<style>
  .device-toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    min-width: 60px;
    border-right: 1px solid #e2e2e2;
    background: rgb(247, 247, 247);
  }
  .device {
    text-align: center;
    font-size: 0.75em;
    margin: 5px 0;
    cursor: pointer;

    &.selected {
      font-weight: bold
    }
  }
</style>
