<template>
  <div class="play-tabs" ref="panel">
    <div ref="header" class="tab-header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
      <span
        v-if="readme"
        class="title"
        :class="{active: active === 'readme'}"
        @click="active = 'readme'">
        <svg id="i-book" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
          <path d="M16 7 C16 7 9 1 2 6 L2 28 C9 23 16 28 16 28 16 28 23 23 30 28 L30 6 C23 1 16 7 16 7 Z M16 7 L16 28" />
        </svg>
        readme
      </span>
      <span
        class="title"
        :class="{active: active === 'console'}"
        @click="active = 'console'">
        <svg id="i-bell" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
          <path d="M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6" />
        </svg>
        console<sup v-if="logs.length > 0" class="logs-count">{{ logs.length }}</sup>
      </span>
      <span
        v-if="example"
        class="title"
        :class="{active: active === 'example'}"
        @click="active = 'example'">
        <svg id="i-code" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
            <path d="M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27" />
        </svg>
        Example
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
    <div ref="body" class="tab-body" v-if="active ==='readme'" style="padding: 10px">
      <div class="markdown-body" v-html="readme"></div>
    </div>
    <div ref="body" class="tab-body console-body" v-if="active ==='console'">
      <div v-for="log in logs" class="console-item">
        <pre><code v-html="log.data"></code></pre>
      </div>
    </div>
    <div ref="body" class="tab-body" v-if="active === 'example'">
      <pre><code v-html="highlightedExample"></code></pre>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'eva.js'
  import highlight from '../utils/highlight'

  export default {
    name: 'console',
    props: {
      example: {
        type: String
      },
      readme: {
        type: String
      }
    },
    computed: {
      ...mapGetters(['logs']),
      highlightedExample() {
        if (!this.example) return
        return highlight.highlightAuto(this.example).value
      }
    },
    data() {
      return {
        active: this.readme ? 'readme' : 'console'
      }
    },

    mounted() {
      this.boundary = {
        min: this.$refs.header.getBoundingClientRect().height,
        max: this.$refs.panel.parentNode.getBoundingClientRect().height
      };
    },

    methods: {
      handleMouseDown({ clientY }) {
        this.resizing = true;
        this.startY = clientY;
        this.originHeight = parseInt(this.$refs.body.getBoundingClientRect().height, 10) || 0;
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        document.onselectstart = () => false;
        document.ondragstart = () => false;
      },

      handleMouseMove({ clientY }) {
        if (!this.resizing ||
          clientY < this.boundary.min ||
          clientY > this.boundary.max) return;
        this.$refs.body.style.height = this.originHeight - clientY + this.startY + 'px';
      },

      handleMouseUp() {
        this.resizing = false;
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
      },

      cleanCurrentLogs() {
        this.$store.commit('CLEAN_CURRENT_LOGS', this.$store.state.route.path)
      }
    }
  }
</script>

<style src="highlight.js/styles/github"></style>
<style src="github-markdown-css"></style>
<style scoped>
  .play-tabs {
    border-top: 1px solid #e2e2e2;
    position: relative;

    .tab-header {
      height: 27px;
      line-height: 26px;
      padding: 0 5px;
      padding-right: 10px;
      font-size: 12px;
      border-bottom: 1px solid #e2e2e2;
      user-select: none;
      cursor: row-resize;

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
        position: relative;
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
        .logs-count {
          color: white;
          background-color: #42b983;
          height: 14px;
          line-height: 50%;
          border-radius: 33px;
          padding: 5px;
          margin-left: 5px;
        }
      }
    }
    .tab-body {
      overflow: auto;
      height: 280px;
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
