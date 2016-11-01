import findIndex from 'array-find-index'
import shallowEqual from '../utils/shallow-equal'

export const UPDATE_CURRENT_SCENARIO = 'UPDATE_CURRENT_SCENARIO'

const updateCurrent = (state, payload) => {
  state.current = payload
}

export default {
  name: 'playspot',
  state: {
    current: null
  },
  mutations: {
    UPDATE_CURRENT_SCENARIO: updateCurrent
  },
  actions: {
    playNext({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = findIndex(getters.playspotRoutes, element => {
        return shallowEqual(state.current, element)
      })
      const next = (current + 1) % total
      commit(UPDATE_CURRENT_SCENARIO, getters.playspotRoutes[next])
    },
    playPrevious({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = findIndex(getters.playspotRoutes, element => {
        return shallowEqual(state.current, element)
      })
      const prev = (total + (current - 1)) % total
      commit(UPDATE_CURRENT_SCENARIO, getters.playspotRoutes[prev])
    },
    updateCurrentScenario({commit}, path) {
      commit(UPDATE_CURRENT_SCENARIO, path)
    }
  },
  getters: {
    currentScenario(state, getters, rootState) {
      const {spot, scenario} = rootState.route.query
      return state.current || {spot, scenario}
    }
  }
}
