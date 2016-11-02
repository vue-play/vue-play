import findIndex from 'array-find-index'
import shallowEqual from 'utils/shallow-equal'
import router from 'router'

export const UPDATE_CURRENT_SCENARIO = 'UPDATE_CURRENT_SCENARIO'

const updateCurrent = (state, payload) => {
  state.current = payload
}

export default {
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
      const nextIndex = (current + 1) % total
      const next = getters.playspotRoutes[nextIndex]
      commit(UPDATE_CURRENT_SCENARIO, next)
      router.push({query: next})
    },
    playPrevious({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = findIndex(getters.playspotRoutes, element => {
        return shallowEqual(state.current, element)
      })
      const prevIndex = (total + (current - 1)) % total
      const prev = getters.playspotRoutes[prevIndex]
      commit(UPDATE_CURRENT_SCENARIO, prev)
      router.push({query: prev})
    },
    updateCurrentScenario({commit}, path) {
      commit(UPDATE_CURRENT_SCENARIO, path)
    },
    activateSpot({commit, getters}, spot) {
      const {scenario} = getters.visibleScenarios[spot][0]
      router.push({query: {spot, scenario}})
    }
  },
  getters: {
    currentScenario(state, getters, rootState) {
      const {spot, scenario} = rootState.route.query
      return state.current || {spot, scenario}
    }
  }
}
