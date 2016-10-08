<template>
  <div class="play-console">
    <div class="console-header">
      <span class="title">
        <svg id="i-code" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
          <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27" />
        </svg>
        console
      </span>
      <div class="console-actions">
        <span
          v-if="logs.length > 0"
          class="console-action hint--top-left hint--rounded"
          aria-label="clean logs"
          @click="cleanCurrentLogs">
          <svg id="i-trash" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
        </svg>
        </span>
      </div>
    </div>
    <div class="console-body">
      <div v-for="log in logs" class="console-item">
        <pre><code v-html="log.data"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'eva.js'

  export default {
    name: 'console',
    computed: {
      ...mapGetters(['logs'])
    },
    methods: {
      cleanCurrentLogs() {
        this.$store.commit('CLEAN_CURRENT_LOGS', this.$store.state.route.path)
      }
    }
  }
</script>

<style src="highlight.js/styles/monokai-sublime"></style>
<style scoped>
  .play-console {
    height: 260px;
    border-top: 1px solid #e2e2e2;
    position: relative;

    .console-header {
      height: 26px;
      line-height: 26px;
      padding: 0 5px;
      padding-right: 10px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      font-size: 12px;
      svg {
        height: 16px;
        color: #999;
      }
      .title {
        text-transform: uppercase;
        color: #999;
        display: inline-flex;
        align-items: center;
        background-color: white;
        svg {
          margin-top: -2px;
        }
      }
    }
    .console-body {
      padding-top: 20px;
      overflow: auto;
      height: 100%;
    }
    .console-item:not(:first-child) {
      border-top: 1px solid #f0f0f0;
    }
    .console-actions {
      float: right;
      .console-action {
        display: inline-flex;
        align-items: center;
        height: 26px;
        cursor: pointer;
        &:hover {
          svg {
            color: #333;
          }
        }
      }
    }
    pre {
      padding: 10px;
      margin: 0;
    }
  }
</style>
