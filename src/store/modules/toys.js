import uid from 'uid'
import highlight from 'utils/highlight'
import shallowEqual from 'utils/shallow-equal'

const matches = (filter, text) => {
  const f = filter.toLowerCase()
  const t = text.toLowerCase()
  return t.includes(f)
}

export default {
  state: {
    logs: [],
    filter: ''
  },
  mutations: {
    ADD_LOG(state, payload) {
      state.logs.push(payload)
    },
    CLEAR_CURRENT_LOGS(state, logs) {
      state.logs = logs
    },
    UPDATE_FILTER(state, payload) {
      state.filter = payload
    }
  },
  actions: {
    filterToys({commit}, payload) {
      commit('UPDATE_FILTER', payload)
    },
    addLog({commit}, {data, route}) {
      commit('ADD_LOG', {
        data,
        route,
        id: uid()
      })
    },
    clearLogs({commit, state}, payload) {
      commit('CLEAR_CURRENT_LOGS', state.logs.filter(log => {
        return !shallowEqual(payload, log.route)
      }))
    }
  },
  getters: {
    logs(state, getters) {
      return state.logs.filter(log => {
        return shallowEqual(log.route, getters.currentScenario)
      }).map(log => {
        return {
          ...log,
          data: highlight.highlight('json', JSON.stringify(log.data, null, 2)).value
        }
      })
    },
    visibleScenarios({filter}, getters, {app}) {
      if (!filter) {
        return app.spots
      }
      const result = {}
      for (const name in app.spots) {
        const scenarios = app.spots[name]
        result[name] = scenarios.filter(scenario => {
          return matches(filter, `${name} ${scenario.scenario}`)
        })
      }
      return result
    },
    playspotRoutes(state, {visibleScenarios}) {
      return Object.keys(visibleScenarios).map(name => {
        const scenarios = visibleScenarios[name]
        return scenarios.map(scenario => ({
          scenario: scenario.scenario,
          spot: name
        }))
      }).reduce((current, next) => [...current, ...next], [])
    },
    filterKeyword(state) {
      return state.filter
    }
  }
}
