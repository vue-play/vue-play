<template>
  <figure class="sidebar" ref="sidebar" v-show="leftPanelExpanded" :style="{width: sidebarWidth}">
    <div class="resize-indicator" v-if="resizing">W: {{ sidebarWidth }}</div>
    <div class="sidebar-border" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></div>
    <h1 @click="toggleHelp">Vue Play</h1>
    <a class="sidebar-mobile" @click="toggleDeviceToolbar">
      <mobile-icon :size="'2em'"/>
    </a>
    <div class="sidebar-search">
      <input @input="filter" placeholder="Type to filter components..." />
    </div>
    <div class="scenarios">
      <ul
        v-for="(scenarios, name, index) in visibleScenarios"
        class="nav-spots"
        :class="{active: isActiveSpot(name, index)}">
        <li class="nav-spot">
          <div
          class="component-name"
          v-if="scenarios.length > 0"
          @click="activateSpot(name)">
            {{ name }}
          </div>
          <ul class="nav-scenarios">
            <li v-for="scenario in scenarios" class="nav-scenario">
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
  import {preventSelectStart, preventSelectStop} from 'utils/prevent-select'
  import {mapGetters, mapActions} from 'vuex'
  import debounce from 'utils/debounce'
  import MobileIcon from './MobileIcon';

  const BOUNDARY = {
    min: 200,
    max: 500
  }

  export default {
    computed: {
      ...mapGetters([
        'leftPanelExpanded',
        'visibleScenarios',
        'sidebarWidth',
        'currentScenario',
        'filterKeyword'
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

    components: { MobileIcon },

    methods: {
      ...mapActions([
        'updatePlayspot',
        'updateSidebarWidth',
        'toggleHelp',
        'filterToys',
        'activateSpot',
        'toggleDeviceToolbar'
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
          clientX > BOUNDARY.max) {
          return
        }
        this.updateSidebarWidth(this.originalWidth + clientX - this.startX)
      },

      handleMouseUp() {
        this.resizing = false
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
        preventSelectStop()
      },

      isActiveSpot(name, index) {
        if (this.filterKeyword) {
          return true
        }
        if (!this.currentScenario.spot && index === 0) {
          return true
        }
        return this.currentScenario.spot === name
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

    .nav-spots {
      margin: 0;
      list-style: none;
      padding-left: 0;
      margin-bottom: 15px;
      &.active {
        .nav-spot {
          .nav-scenarios {
            display: block;
          }
          .component-name {
            font-weight: bold;
          }
        }
      }
      .nav-spot {
        .component-name {
          cursor: pointer;
          margin: 10px;
          margin-bottom: 5px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ececec;
        }
        .nav-scenarios {
          display: none;
          padding-left: 0;
          .nav-scenario {
            a {
              font-size: 14px;
              display: block;
              cursor: pointer;
              padding: 5px 10px;
              padding-left: 20px;
              text-decoration: none;
              color: #666;
              &:hover {
                color: #333;
              }
              &.router-link-active {
                color: #333;
                font-weight: bold;
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
    .sidebar-mobile {
      position: absolute;
      right: 0;
      top: 5px;
      cursor: pointer;
    }
  }
</style>
