import Vue from 'vue'
import qs from 'query-string'
import findScenario from './utils/find-scenario'

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
      return {
        current: scenario && scenario.component
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
