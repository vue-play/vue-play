import findIndex from 'array-find-index'
import shallowEqual from 'utils/shallow-equal'
import router from 'router'

export const UPDATE_CURRENT_SCENARIO = 'UPDATE_CURRENT_SCENARIO'

export default {
  state: {
    current: null
  },
  mutations: {
    UPDATE_CURRENT_SCENARIO(state, payload) {
      state.current = payload
    }
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
      router.push(getters.getQuery)
      // router.push({
      //   query: {
      //     ...next,
      //     ...getters.layoutQuery,
      //     ...getters.filterQuery
      //   }
      // })
    },
    playPrevious({commit, getters, state}) {
      const total = getters.playspotRoutes.length
      const current = findIndex(getters.playspotRoutes, element => {
        return shallowEqual(state.current, element)
      })
      const prevIndex = (total + (current - 1)) % total
      const prev = getters.playspotRoutes[prevIndex]
      commit(UPDATE_CURRENT_SCENARIO, prev)
      router.push(getters.getQuery)
      // router.push({
      //   query: {
      //     ...prev,
      //     ...getters.layoutQuery,
      //     ...getters.filterQuery
      //   }
      // })
    },
    updateCurrentScenario({commit}, path) {
      commit(UPDATE_CURRENT_SCENARIO, path)
    },
    activateSpot({commit, getters}, spot) {
      const {scenario} = getters.visibleScenarios[spot][0]
      commit(UPDATE_CURRENT_SCENARIO, {spot, scenario})
      router.push(getters.getQuery)
      // router.push({query: {
      //   spot,
      //   scenario,
      //   ...getters.layoutQuery,
      //   ...getters.filterQuery
      // }})
    }
  },
  getters: {
    currentScenario(state, getters, rootState) {
      const {spot, scenario} = rootState.route.query
      return state.current || {spot, scenario}
    }
  }
}
