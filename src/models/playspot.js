export const UPDATE_PLAYSPOT = 'UPDATE_PLAYSPOT'

const updateCurrent = (state, payload) => state.current = payload

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
      const next = getters.playspotRoutes.indexOf(state.current) + 1
      commit(UPDATE_PLAYSPOT, getters.playspotRoutes[next])
    },
    playPrevious({commit, getters, state}) {
      const prev = getters.playspotRoutes.indexOf(state.current) - 1
      commit(UPDATE_PLAYSPOT, getters.playspotRoutes[prev < 0 ? 0 : prev])
    },
    setPlayspot({commit}, payload) {
      commit(UPDATE_PLAYSPOT, payload)
    },
    updatePlayspot({commit, rootState}) {
      commit(UPDATE_PLAYSPOT, rootState.route.path)
    }
  },
  getters: {
    currentPlayspot(state, getters, rootState) {
      return state.current || rootState.route.path
    }
  }
}
