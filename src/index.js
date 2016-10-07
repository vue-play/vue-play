import EVA from 'eva.js'
import App from './components/App'

const play = toys => {
  const routePaths = {}
  const routes = route => Object.keys(toys).map(componentName => {
    return Object.keys(toys[componentName]).map(type => {
      const componentFn = toys[componentName][type]
      const Component = typeof componentFn === 'function' ?
        {render: componentFn} :
        componentFn
      const View = {
        render(h) {
          return (
            <div class="view">
              <Component />
            </div>
          )
        }
      }
      const routePath = `/${componentName}/${type.replace(' ', '_')}`
      routePaths[componentName] = routePaths[componentName] || []
      routePaths[componentName].push({
        type: type,
        path: routePath
      })
      return route(routePath, View)
    })
  }).reduce((current, next) => current.concat(next), [])

  const app = new EVA()
  app.model({
    name: 'toys',
    state: {
      paths: routePaths
    }
  })
  app.router(routes)
  app.start(App, '#app')
}

export {
  play
}
