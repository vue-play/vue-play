export const UPDATE_PLAYSPOT = 'UPDATE_PLAYSPOT'

export default {
  name: 'playspot',
  state: {
    // TODO: Figure out how to set this initially
    current: null
  },
  mutations: {
    UPDATE_PLAYSPOT(state, payload) {
      state.current = payload
    },
  },
  actions: {
    playNext({commit}) {
      // TODO: Get the next playspot
      const next = null;
      commit(UPDATE_PLAYSPOT, next)
    },
    playPrevious({commit}) {
      // TODO: Get the previous playspot
      const prev = null;
      commit(PREV_PLAYSPOT, prev)
    }
  }
}
