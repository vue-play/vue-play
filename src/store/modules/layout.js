export const TOGGLE_LEFT_PANEL = 'TOGGLE_LEFT_PANEL'
export const TOGGLE_BOTTOM_PANEL = 'TOGGLE_BOTTOM_PANEL'
export const TOGGLE_ALL_PANELS = 'TOGGLE_ALL_PANELS'
export const UPDATE_SIDEBAR_WIDTH = 'UPDATE_SIDEBAR_WIDTH'
export const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB'
export const TOGGLE_HELP = 'TOGGLE_HELP'
export const TOGGLE_DEVICE_TOOLBAR = 'TOGGLE_DEVICE_TOOLBAR'
export const SET_FRAME_SIZE = 'SET_FRAME_SIZE'

export default {
  state: {
    leftPanelExpanded: true,
    bottomPanelExpanded: true,
    sidebarWidth: 280,
    activeTab: null,
    showHelp: false,
    showDeviceToolbar: false,
    frameSize: {
      width: '100%',
      height: '100%'
    }
  },
  mutations: {
    TOGGLE_LEFT_PANEL(state) {
      state.leftPanelExpanded = !state.leftPanelExpanded
    },
    TOGGLE_BOTTOM_PANEL(state) {
      state.bottomPanelExpanded = !state.bottomPanelExpanded
    },
    UPDATE_SIDEBAR_WIDTH(state, payload) {
      state.sidebarWidth = payload
    },
    UPDATE_ACTIVE_TAB(state, payload) {
      state.activeTab = payload
    },
    TOGGLE_HELP(state) {
      state.showHelp = !state.showHelp
    },
    TOGGLE_DEVICE_TOOLBAR(state) {
      state.showDeviceToolbar = !state.showDeviceToolbar
    },
    SET_FRAME_SIZE(state, payload) {
      if (payload) {
        state.frameSize.width = payload.width
        state.frameSize.height = payload.height
      } else {
        state.frameSize.width = state.frameSize.height = '100%'
      }
    }
  },
  actions: {
    toggleLeftPanel({commit}) {
      commit(TOGGLE_LEFT_PANEL)
    },
    toggleBottomPanel({commit}) {
      commit(TOGGLE_BOTTOM_PANEL)
    },
    toggleAllPanels({commit, state}) {
      if ((state.leftPanelExpanded && state.bottomPanelExpanded) || (!state.leftPanelExpanded && !state.bottomPanelExpanded)) {
        commit(TOGGLE_LEFT_PANEL)
        commit(TOGGLE_BOTTOM_PANEL)
      } else {
        if (state.leftPanelExpanded) {
          commit(TOGGLE_LEFT_PANEL)
        }
        if (state.bottomPanelExpanded) {
          commit(TOGGLE_BOTTOM_PANEL)
        }
      }
    },
    updateSidebarWidth({commit}, payload) {
      commit(UPDATE_SIDEBAR_WIDTH, payload)
    },
    updateActiveTab({commit}, payload) {
      commit(UPDATE_ACTIVE_TAB, payload)
    },
    toggleHelp({commit}) {
      commit(TOGGLE_HELP)
    },
    toggleDeviceToolbar({commit}) {
      commit(TOGGLE_DEVICE_TOOLBAR)
    },
    setFrameSize({commit}, payload) {
      commit(SET_FRAME_SIZE, payload)
    }
  },
  getters: {
    leftPanelExpanded(state) {
      return state.leftPanelExpanded
    },
    bottomPanelExpanded(state) {
      return state.bottomPanelExpanded
    },
    bottomPanelHeight(state) {
      return state.bottomPanelHeight
    },
    sidebarWidth(state) {
      return state.sidebarWidth + 'px'
    },
    mainWidth(state, getters) {
      return `calc(100% - ${getters.sidebarWidth})`
    },
    activeTab(state) {
      return state.activeTab
    },
    showHelp(state) {
      return state.showHelp
    },
    showDeviceToolbar(state) {
      return state.showDeviceToolbar
    },
    frameSize(state) {
      return state.frameSize
    }
  }
}
