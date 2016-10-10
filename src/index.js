import EVA from 'eva.js'
import uid from 'uid'
import App from './components/App'
import Tabs from './components/Tabs'
import highlight from './utils/highlight'

const play = toys => {
  const routePaths = {}
  const routeIds = []
  const routes = route => Object.keys(toys).map(componentName => {
    return Object.keys(toys[componentName]).map(type => {
      const routeId = `/${componentName}/${type.replace(/\s/g, '_')}`

      const componentFn = toys[componentName][type]
      const Component = typeof componentFn === 'function' ?
        {render: componentFn} :
        typeof componentFn === 'string' ?
        {template: componentFn} :
        componentFn
      Component.name = Component.name || type.replace(/\s/g, '_')

      const example = Component.example || Component.template
      const readme = Component.readme
      delete Component.example
      delete Component.readme

      const View = {
        name: 'view',
        render(h) {
          return (
            <div class="view">
              <div class="play-ground">
                <Component />
              </div>
              <Tabs example={example} readme={readme} />
            </div>
          )
        }
      }
      routePaths[componentName] = routePaths[componentName] || []
      routePaths[componentName].push({
        type: type,
        path: routeId
      })
      routeIds.push(routeId)
      return route(routeId, View)
    })
  }).reduce((current, next) => current.concat(next), [])

  const app = new EVA()

  app.use(Vue => {
    Vue.prototype.$log = function (data) {
      const path = this.$store.state.route.path
      this.$store.commit('ADD_LOG', {
        data,
        path,
        id: uid()
      })
      setTimeout(() => {
        const consoleEl = document.querySelector('.tab-body')
        consoleEl.scrollTop = consoleEl.scrollHeight
      })
    }
    Vue.prototype.$clear = function () {
      const path = this.$store.state.route.path
      this.$store.commit('CLEAN_CURRENT_LOGS', path)
    }
  })

  app.model({
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
      }
    }
  })
  app.router(routes)
  app.start(App, '#app')
}

export {
  play
}
