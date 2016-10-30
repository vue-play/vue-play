export const TOGGLE_LEFT_PANEL = 'TOGGLE_LEFT_PANEL'
export const TOGGLE_BOTTOM_PANEL = 'TOGGLE_BOTTOM_PANEL'
export const TOGGLE_ALL_PANELS = 'TOGGLE_ALL_PANELS'
export const SET_BOTTOM_PANEL_HEIGHT = 'SET_BOTTOM_PANEL_HEIGHT'
export const UPDATE_SIDEBAR_WIDTH = 'UPDATE_SIDEBAR_WIDTH'

export const defaultBottomPanelHeight = 280

export default {
  name: 'layout',
  state: {
    leftPanelExpanded: true,
    bottomPanelExpanded: true,
    bottomPanelHeight: defaultBottomPanelHeight,
    sidebarWidth: 280
  },
  mutations: {
    TOGGLE_LEFT_PANEL(state) {
      state.leftPanelExpanded = !state.leftPanelExpanded
    },
    TOGGLE_BOTTOM_PANEL(state) {
      state.bottomPanelExpanded = !state.bottomPanelExpanded
    },
    SET_BOTTOM_PANEL_HEIGHT(state, payload) {
      state.bottomPanelHeight = payload || defaultBottomPanelHeight
    },
    UPDATE_SIDEBAR_WIDTH(state, payload) {
      state.sidebarWidth = payload
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
    setBottomPanelHeight({commit}, payload) {
      commit(SET_BOTTOM_PANEL_HEIGHT, payload)
    },
    updateSidebarWidth({commit}, payload) {
      commit(UPDATE_SIDEBAR_WIDTH, payload)
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
    }
  }
}
