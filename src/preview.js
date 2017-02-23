import Vue from 'vue'
import qs from 'query-string'
import get from 'lodash/get'
import findScenario from './utils/find-scenario'
import filterVuex from './utils/filter-vuex'
import {parseKey} from './utils/key-events'
import {getSpots} from './play'

export default function () {
  const spots = getSpots()
  const query = qs.parse(location.search)

  Vue.prototype.$log = function (data) {
    parent.postMessage({
      type: 'ADD_LOG',
      payload: data
    }, location.origin)
  }
  return new Vue({
    el: '#app',
    data() {
      const scenario = findScenario(spots, query)
      const component = scenario && scenario.component
      if (component) {
        component.example = undefined
        component.readme = undefined
      }
      return {
        current: component
      }
    },
    created() {
      window.addEventListener('message', ({data}) => {
        if (data.type === 'UPDATE_ROUTE') {
          const scenario = findScenario(spots, data.payload)
          if (scenario) {
            this.current = scenario.component

            // Handle Vuex state if found
            // If we have a cached initial state, use that
            if (get(this.current, 'store.constructor.name') === 'Store' && this.current._initialState) {
              this.current.store.replaceState(JSON.parse(this.current._initialState))
            }
          }
        }
      })
      window.onkeydown = e => {
        parent.postMessage({
          type: 'APPLY_SHORTCUT',
          payload: JSON.stringify(parseKey(e))
        }, location.origin)
      }
      parent.postMessage({
        type: 'SET_SPOTS',
        payload: JSON.stringify(spots, filterVuex)
      }, location.origin)
    },
    render(h) {
      // Save original store state on the first render
      if (get(this.current, 'store.constructor.name') === 'Store' && !this.current._initialState) {
        this.current._initialState = JSON.stringify(this.current.store.state)
      }

      return h('div', {attrs: {id: 'app'}}, [h(this.current)])
    }
  })
}
