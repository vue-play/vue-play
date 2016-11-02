import Vue from 'vue'
import qs from 'query-string'
import findScenario from './utils/find-scenario'
import {parseKey} from './utils/key-events'

export default function ({spots, components}) {
  const query = qs.parse(location.search)
  if (components) {
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name])
    })
  }
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
        payload: JSON.stringify(spots)
      }, location.origin)
    },
    render(h) {
      return h('div', {attrs: {id: 'app'}}, [h(this.current)])
    }
  })
}
