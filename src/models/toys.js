import { routePaths } from '../index'

export default {
  name: 'toys',
  state: {
    paths: routePaths,
    logs: []
  },
  mutations: {
    ADD_LOG(state, payload) {
      state.logs.push(payload)
    },
    CLEAN_CURRENT_LOGS(state, path) {
      state.logs = state.logs.filter(log => log.path !== path)
    }
  },
  getters: {
    logs(state, getters, rootState) {
      return state.logs.filter(log => {
        return log.path === rootState.route.path
      }).map(log => {
        return {
          ...log,
          data: highlight.highlight('json', JSON.stringify(log.data, null, 2)).value
        }
      })
    },
    toys({ paths }) {
      return paths
    },
    playspotRoutes(state) {
      return Object
        .keys(state.paths)
        .map(component =>
          state.paths[component].map(playspot => playspot.path)
        )
        .reduce((acc, curr) => acc.concat(curr), [])
    }
  }
}
