import highlight from '../utils/highlight'
import {routePaths} from '../index'

const matches = (filter, text) => {
  const f = filter.toLowerCase()
  const t = text.toLowerCase()
  return t.includes(f)
}

export default {
  name: 'toys',
  state: {
    paths: routePaths,
    logs: [],
    filter: ''
  },
  mutations: {
    ADD_LOG(state, payload) {
      state.logs.push(payload)
    },
    CLEAN_CURRENT_LOGS(state, path) {
      state.logs = state.logs.filter(log => log.path !== path)
    },
    UPDATE_FILTER(state, payload) {
      state.filter = payload
    }
  },
  actions: {
    filterToys({commit}, payload) {
      commit('UPDATE_FILTER', payload)
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
    toys({paths, filter}) {
      if (filter === '') {
        return paths
      }
      return Object.keys(paths).reduce((components, component) => {
        const scenarios = paths[component]
          .filter(({type}) => matches(filter, `${component} ${type}`))

        if (scenarios.length === 0 && !matches(filter, component)) {
          return components
        }
        return {...components, [component]: scenarios}
      }, {})
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
