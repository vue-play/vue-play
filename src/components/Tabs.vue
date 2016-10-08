<template>
  <div class="play-tabs">
    <div class="tab-header">
      <span class="title" :class="{active: active === 'console'}" @click="active = 'console'">
        <svg id="i-bell" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
          <path d="M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6" />
        </svg>
        console
      </span>
      <span
        v-if="sample"
        class="title"
        :class="{active: active === 'sample'}"
        @click="active = 'sample'">
        <svg id="i-code" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
            <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27" />
        </svg>
        Sample
      </span>
      <div class="tab-actions">
        <span
          v-if="logs.length > 0 && active === 'console'"
          class="tab-action hint--top-left hint--rounded"
          aria-label="clean logs"
          @click="cleanCurrentLogs">
          <svg id="i-trash" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
        </svg>
        </span>
      </div>
    </div>
    <div class="tab-body" v-if="active ==='console'">
      <div v-for="log in logs" class="console-item">
        <pre><code v-html="log.data"></code></pre>
      </div>
    </div>
    <div class="tab-body" v-if="active === 'sample'">
      <pre><code v-html="highlightedSample"></code></pre>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'eva.js'
  import highlight from '../utils/highlight'

  export default {
    name: 'console',
    props: {
      sample: {
        type: String
      }
    },
    computed: {
      ...mapGetters(['logs']),
      highlightedSample() {
        if (!this.sample) return
        return highlight.highlightAuto(this.sample).value
      }
    },
    data() {
      return {
        active: 'console'
      }
    },
    methods: {
      cleanCurrentLogs() {
        this.$store.commit('CLEAN_CURRENT_LOGS', this.$store.state.route.path)
      }
    }
  }
</script>

<style src="highlight.js/styles/github"></style>
<style scoped>
  .play-tabs {
    height: 260px;
    border-top: 1px solid #e2e2e2;
    position: relative;

    .tab-header {
      height: 27px;
      line-height: 26px;
      padding: 0 5px;
      padding-right: 10px;
      font-size: 12px;
      border-bottom: 1px solid #e2e2e2;
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
        cursor: pointer;
        user-select: none;
        svg {
          margin-top: -2px;
        }
        &.active {
          color: #333;
          svg {
            color: #333;
          }
        }
        &:hover {
          color: #666;
        }
      }
    }
    .tab-body {
      overflow: auto;
      height: calc(100% - 27px);
    }
    .console-item:not(:first-child) {
      border-top: 1px solid #f0f0f0;
    }
    .tab-actions {
      float: right;
      height: 26px;
      .tab-action {
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
