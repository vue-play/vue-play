import EVA from 'eva.js'
import action from './utils/action'
import RouterApp from './components/App'
import Preview from './components/Preview'
import Tabs from './components/Tabs'
import {registerModels} from './models'

export const routePaths = {}
export const routeIds = []
export const routes = []

const isPreview = location.hash.indexOf('#/__preview') > -1

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
          beforeRouteEnter(to, from, next) {
            next(vm => {
              vm.$parent.updateIframe(to.path)
            })
          },
          render(h) {
            return h(Tabs, {props: {example, readme}})
          }
        }

        const PreviewView = {
          name: 'preview-view',
          render(h) {
            return h(Component)
          }
        }

        routePaths[componentName] = routePaths[componentName] || []
        routePaths[componentName].push({
          type,
          path: routeId
        })
        routeIds.push(routeId)
        routes.push(
          {
            name: 'default',
            path: routeId,
            component: View,
            meta: {
              name: type
            }
          },
          {
            path: `/__preview${routeId}`,
            component: PreviewView,
            name: 'preview'
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
      if (typeof this.localComponents === 'object') {
        Object.keys(this.localComponents).forEach(name => {
          Vue.component(name, this.localComponents[name])
        })
      }
    })


    app.model({
      state: {
        isPreview,
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

    const App = isPreview ? Preview : RouterApp

    app.start(App, selector)
  }
}

export {Play, action}
