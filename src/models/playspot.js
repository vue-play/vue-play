export default {
  name: 'playspot',
  state: {
    current: null
  },
  mutations: {
    NEXT_PLAYSPOT(state) {

    },
    PREV_PLAYSPOT(state) {

    }
  },
  actions: {
    playNext({ commit }) {
      commit('NEXT_PLAYSPOT')
    },
    playPrev({ commit }) {
      commit('PREV_PLAYSPOT')
    }
  }
}
