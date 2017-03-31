import Vue from 'vue'
import qs from 'query-string'
import findScenario from './utils/find-scenario'
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
        payload: JSON.stringify(purify(spots))
      }, location.origin)
    },
    render(h) {
      return h('div', {attrs: {id: 'app'}}, [h(this.current)])
    }
  })
}

function purify(spots) {
  const result = {}
  for (const name in spots) {
    result[name] = spots[name].map(spot => ({
      scenario: spot.scenario,
      component: {
        example: spot.component.example,
        template: spot.component.template,
        readme: spot.component.readme
      }
    }))
  }
  return result
}
