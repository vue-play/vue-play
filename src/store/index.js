import Vue from 'vue'
import Vuex from 'vuex'

import layout from './modules/layout'
import playspot from './modules/playspot'
import shortcuts from './modules/shortcuts'
import toys from './modules/toys'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    layout,
    playspot,
    shortcuts,
    toys
  }
})

export default store
