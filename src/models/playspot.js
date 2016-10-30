export const UPDATE_PLAYSPOT = 'UPDATE_PLAYSPOT'

const updateCurrent = (state, payload) => {
  state.current = payload
}

export default {
  name: 'playspot',
  state: {
    current: null
  },
  mutations: {
    NEXT_PLAYSPOT: updateCurrent,
    UPDATE_PLAYSPOT: updateCurrent
  },
  actions: {
    playNext({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = getters.playspotRoutes.indexOf(state.current)
      const next = (current + 1) % total
      commit(UPDATE_PLAYSPOT, getters.playspotRoutes[next])
    },
    playPrevious({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = getters.playspotRoutes.indexOf(state.current)
      const prev = (total + (current - 1)) % total
      commit(UPDATE_PLAYSPOT, getters.playspotRoutes[prev])
    },
    updatePlayspot({commit}, path) {
      commit(UPDATE_PLAYSPOT, path)
    }
  },
  getters: {
    currentPlayspot(state, getters, rootState) {
      return state.current || rootState.route.path
    }
  }
}
