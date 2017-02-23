import Vuex from 'vuex'
import {play} from '../src/play'
import Storage from './Storage.vue'
import StorageCounter from './Storage-counter.vue'

play('Storage', module)
  .add('static', {
    store: new Vuex.Store({
      state: {
        enabled: true
      },
      getters: {
        isAlive: s => s.enabled
      }
    }),
    render(h) {
      return h(Storage)
    }
  })
  .add('counter', {
    store: new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
      }
    }),
    render(h) {
      return h(StorageCounter)
    }
  })
