<template>
  <figure class="sidebar" ref="sidebar" v-show="leftPanelExpanded" :style="{width: sidebarWidth}">
    <div class="resize-indicator" v-if="resizing">W: {{ sidebarWidth }}</div>
    <div class="sidebar-border" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></div>
    <h1 @click="toggleHelp">Vue Play</h1>
    <div class="sidebar-search">
      <input @input="filter" placeholder="Type to filter components..." />
    </div>
    <div class="scenarios">
      <ul v-for="(scenarios, name) in visibleScenarios" class="paths">
        <li>
          <div class="component-name" v-if="scenarios.length > 0">{{ name }}</div>
          <ul>
            <li v-for="scenario in scenarios">
              <router-link
                exact
                :to="{query: {spot: name, scenario: scenario.scenario}}">
                <svg style="height:10px;" id="i-chevron-right" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
                  <path d="M12 30 L24 16 12 2" />
                </svg>
                {{ scenario.scenario }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </figure>
</template>

<script>
  import {preventSelectStart, preventSelectStop} from 'utils/prevent-select'
  import {mapGetters, mapActions} from 'vuex'
  import debounce from 'utils/debounce'

  const BOUNDARY = {
    min: 200,
    max: 500
  }

  export default {
    computed: {
      ...mapGetters([
        'leftPanelExpanded',
        'visibleScenarios',
        'sidebarWidth'
      ])
    },

    data() {
      return {
        resizing: false,
        startX: null,
        originalWidth: null,
        keyword: ''
      }
    },

    methods: {
      ...mapActions([
        'updatePlayspot',
        'updateSidebarWidth',
        'toggleHelp',
        'filterToys'
      ]),
      filter: debounce(function ({target}) {
        this.filterToys(target.value)
      }, 350),
      handleMouseDown({clientX}) {
        this.resizing = true
        this.startX = clientX
        this.originalWidth = parseInt(this.$refs.sidebar.getBoundingClientRect().width, 10) || 0
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
        preventSelectStart()
      },

      handleMouseMove({clientX}) {
        if (!this.resizing ||
          clientX < BOUNDARY.min ||
          clientX > BOUNDARY.max) return
        this.updateSidebarWidth(this.originalWidth + clientX - this.startX)
      },

      handleMouseUp() {
        this.resizing = false
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
        preventSelectStop()
      }
    }
  }
</script>

<style scoped>
  $logoHeight: 40px;
  $searchHeight: 50px;

  .sidebar {
    margin: 0;
    width: 280px;
    background-color: rgb(247, 247, 247);
    border-right: 1px solid #e2e2e2;
    height: 100%;
    overflow: auto;
    position: relative;

    .sidebar-border {
      cursor: col-resize;
      width: 5px;
      position: absolute;
      top: 0;
      right: 0;
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
              cursor: pointer;
              padding: 8px 10px;
              text-decoration: none;
              color: #666;
              &:hover {
                color: #333;
              }
              &.router-link-active {
                color: #42b983;
              }
            }
          }
        }
      }
    }
    h1 {
      margin: 0;
      font-weight: 300;
      text-align: center;
      height: $logoHeight;
      line-height: $logoHeight;
      font-size: 20px;
      color: #757575;;
      cursor: pointer;
      box-shadow: 0 0 1px #bfbfbf;
      border-bottom: 1px solid rgba(255, 255, 255, 0.46);
      font-family: cursive, sans-serif;
      &:hover {
        color: #42b983;
      }
    }
    .sidebar-search {
      height: $searchHeight;
      display: flex;
      align-items: center;
      padding: 0 10px;
      input {
        height: 60%;
        width: 100%;
        font-size: 16px;
        padding: 5px;
        outline: none;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
        &:focus {
          border-color: #ccc;
        }
      }
    }
    .scenarios {
      height: calc(100% - $logoHeight - $searchHeight);
      overflow: auto;
    }
  }
</style>
