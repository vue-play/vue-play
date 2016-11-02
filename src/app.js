import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import store from './store'
import router from './router'

export default function ({spots = []} = {}) {
  store.registerModule('app', {
    state: {
      spots
    },
    mutations: {
      SET_SPOTS(state, payload) {
        state.spots = payload
      }
    },
    actions: {
      setSpots({commit}, payload) {
        commit('SET_SPOTS', payload)
      }
    }
  })

  sync(store, router)

  return new Vue({
    el: '#app',
    store,
    router,
    render(h) {
      return h('router-view')
    }
  })
}
