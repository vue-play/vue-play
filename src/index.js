import EVA from 'eva.js'
import uid from 'uid'
import App from './components/App'
import Tabs from './components/Tabs'
import {registerModels} from './models'

export const routePaths = {}
export const routes = []

class Play {
  useComponents(components) {
    this.localComponents = components
  }

  addScenarios(componentName, scenarios) {
    if (scenarios) {
      Object.keys(scenarios).forEach(type => {
        const routeId = `/${componentName}/${type.replace(/\s/g, '_')}`

        const componentFn = scenarios[type]
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
            return h('div', {staticClass: 'view'}, [
              h('div', {staticClass: 'play-ground'}, [
                h(Component)
              ]),
              h(Tabs, {props: {example, readme}})
            ])
          }
        }

        routePaths[componentName] = routePaths[componentName] || []
        routePaths[componentName].push({
          type,
          path: routeId
        })
        routes.push(
          {
            name: 'default',
            path: routeId,
            component: View,
            meta: {
              name: type
            }
          }
        )
      })
    }
  }

  describe(componentName, cb) {
    const add = (scenario, component) => {
      this.addScenarios(componentName, {[scenario]: component})
      return this
    }
    if (typeof cb === 'function') {
      cb(add)
    } else {
      return add
    }
  }

  start(selector = '#app') {
    const app = new EVA()

    app.use(Vue => {
      Vue.prototype.$log = function (data) {
        const path = this.$store.state.route.path
        this.$store.commit('ADD_LOG', {
          data,
          path,
          id: uid()
        })
        const consoleEl = document.querySelector('.console-body')
        if (consoleEl) {
          Vue.nextTick(() => {
            consoleEl.scrollTop = consoleEl.scrollHeight
          })
        }
      }

      Vue.prototype.$clear = function () {
        const path = this.$store.state.route.path
        this.$store.commit('CLEAR_CURRENT_LOGS', path)
      }

      if (typeof this.localComponents === 'object') {
        Object.keys(this.localComponents).forEach(name => {
          Vue.component(name, this.localComponents[name])
        })
      }
    })

    app.model({
      state: {
        routes
      },
      getters: {
        defaultRoutes(state) {
          return state.routes.filter(route => {
            return route.name === 'default'
          })
        }
      }
    })
    registerModels(app)
    app.router({
      routes
    })

    app.start(App, selector)
  }
}

export {Play}
