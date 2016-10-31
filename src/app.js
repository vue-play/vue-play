import EVA from 'eva.js'
import {registerModels} from './models'
import Home from './components/Home.vue'

export default function ({spots}) {
  const app = new EVA()
  app.router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      }
    ]
  })
  app.model({
    state: {
      spots
    }
  })
  registerModels(app)
  app.start({
    render(h) {
      return h('router-view')
    }
  }, '#app')
}
