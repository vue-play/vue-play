import EVA from 'eva.js'
import uid from 'uid'
import App from './components/App'
import Tabs from './components/Tabs'
import {registerModels} from './models'

export const routePaths = {}
export const routeIds = []

export default class Play {
  useComponents(components) {
    this.localComponents = components
  }

  start(toys, selector = '#app') {
    const localComponents = this.localComponents

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
            return h('div', {class: 'view'}, [
              h('div', {class: 'play-ground'}, [h(Component)]),
              h(Tabs, {props: {example, readme}})
            ])
          }
        }
        routePaths[componentName] = routePaths[componentName] || []
        routePaths[componentName].push({
          type,
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
        const consoleEl = document.querySelector('.console-body')
        if (consoleEl) {
          Vue.nextTick(() => {
            consoleEl.scrollTop = consoleEl.scrollHeight
          })
        }
      }
      Vue.prototype.$clear = function () {
        const path = this.$store.state.route.path
        this.$store.commit('CLEAN_CURRENT_LOGS', path)
      }

      // register components
      if (typeof localComponents === 'object') {
        Object.keys(localComponents).forEach(name => {
          Vue.component(name, localComponents[name])
        })
      }
    })

    registerModels(app)
    app.router(routes)
    app.start(App, selector)
  }
}
