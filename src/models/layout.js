export const TOGGLE_LEFT_PANEL = 'TOGGLE_LEFT_PANEL'
export const TOGGLE_BOTTOM_PANEL = 'TOGGLE_BOTTOM_PANEL'
export const TOGGLE_ALL_PANELS = 'TOGGLE_ALL_PANELS'

export default {
  name: 'layout',
  state: {
    leftPanelExpanded: true,
    bottomPanelExpanded: true
  },
  mutations: {
    TOGGLE_LEFT_PANEL(state) {
      state.leftPanelExpanded = !state.leftPanelExpanded
    },
    TOGGLE_BOTTOM_PANEL(state) {
      state.bottomPanelExpanded = !state.bottomPanelExpanded
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
    }
  }
}

// Computed methods
export function leftPanelExpanded() {
  return this.$store.state.layout.leftPanelExpanded
}

export function bottomPanelExpanded() {
  return this.$store.state.layout.bottomPanelExpanded
}
