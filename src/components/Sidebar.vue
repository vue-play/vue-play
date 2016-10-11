<template>
  <figure class="sidebar" ref="sidebar" :style="{width: sidebarWidth + 'px'}">
    <div class="resize-indicator" v-if="resizing">W: {{ sidebarWidth }}px</div>
    <div class="sidebar-border" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></div>
    <h1><a href="https://github.com/egoist/vue-play">Play</a></h1>
    <ul v-for="(routes, component) in paths" class="paths">
      <li>
        <div class="component-name">{{ component }}</div>
        <ul>
          <li v-for="child in routes">
            <router-link :to="child.path">
              {{ child.type }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </figure>
</template>

<script>
  const BOUNDARY = {
    min: 200,
    max: 500
  }

  export default {
    computed: {
      paths() {
        return this.$store.state.toys.paths
      }
    },

    data() {
      return {
        sidebarWidth: 280,
        resizing: false,
        startX: null,
        originalWidth: null
      }
    },

    methods: {
      handleMouseDown({clientX}) {
        this.resizing = true
        this.startX = clientX
        this.originalWidth = parseInt(this.$refs.sidebar.getBoundingClientRect().width, 10) || 0
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
        document.onselectstart = () => false
        document.ondragstart = () => false
      },

      handleMouseMove({clientX}) {
        if (!this.resizing ||
          clientX < BOUNDARY.min ||
          clientX > BOUNDARY.max) return
        this.sidebarWidth = this.originalWidth + clientX - this.startX
      },

      handleMouseUp() {
        this.resizing = false
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    margin: 0;
    width: 280px;
    background-color: #f9f9f9;
    border-right: 1px solid #e2e2e2;
    height: 100%;
    overflow: auto;
    position: relative;

    .sidebar-border {
      cursor: col-resize;
      width: 20px;
      float: right;
      height: 100%;
    }

    .paths {
      margin: 0;
      list-style: none;
      padding-left: 0;
      > li {
        .component-name {
          padding: 10px;
        }
        ul {
          padding-left: 0;
          li {
            a {
              display: block;
              padding: 10px;
              text-decoration: none;
              color: #42b983;
              &:hover, &.router-link-active {
                background-color: #f0f0f0;
              }
              &.router-link-active {
                padding-left: 7px;
                border-left: 3px solid #42b983;
              }
            }
          }
        }
      }
    }
    h1 {
      margin: 0;
      font-weight: 300;
      border-bottom: 1px solid #e2e2e2;
      background-color: white;
      text-align: center;
      a {
        color: #42b983;
        text-decoration: none;
        display: block;
        padding: 10px;
      }
    }
  }
</style>
