<template>
  <figure class="sidebar" ref="sidebar" v-show="leftPanelExpanded" :style="{width: sidebarWidth}">
    <div class="resize-indicator" v-if="resizing">W: {{ sidebarWidth }}</div>
    <div class="sidebar-border" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></div>
    <h1 @click="toggleHelp">Play</h1>
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
  import {preventSelectStart, preventSelectStop} from '../utils/prevent-select'
  import {mapGetters, mapActions} from 'eva.js'
  import debounce from '../utils/debounce'

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
    background-color: #f9f9f9;
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
      height: $logoHeight;
      line-height: $logoHeight;
      font-size: 20px;
      color: #42b983;
      cursor: pointer;
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
