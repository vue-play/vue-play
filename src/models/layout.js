export default {
  name: 'layout',
  state: {
    leftPanelExpanded: true,
    bottomPanelExpanded: true
  },
  mutations: {
    TOGGLE_LEFT_PANEL() {

    },
    TOGGLE_BOTTOM_PANEL() {

    }
  },
  actions: {
    toggleLeftPanel(store) {
      store.commit('TOGGLE_LEFT_PANEL')
    },
    toggleBottomPanel(store) {
      store.commit('TOGGLE_BOTTOM_PANEL')
    }
  }
}
