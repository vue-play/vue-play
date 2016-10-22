export const NEXT_PLAYSPOT = 'NEXT_PLAYSPOT'
export const PREV_PLAYSPOT = 'PREV_PLAYSPOT'

export default {
  name: 'playspot',
  state: {
    current: null
  },
  mutations: {
    NEXT_PLAYSPOT() {
      // go to next playspot
    },
    PREV_PLAYSPOT() {
      // go to prev playspot
    }
  },
  actions: {
    playNext({commit}) {
      commit(NEXT_PLAYSPOT)
    },
    playPrevious({commit}) {
      commit(PREV_PLAYSPOT)
    }
  }
}
