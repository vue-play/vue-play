import Vue from 'vue'
import Vuex from 'vuex'

import MyButton from './MyButton.vue'
import Box from './Box.vue'

Vue.use(Vuex)

const load = requireContext => {
  return requireContext.keys().map(requireContext)
}

load(require.context('./', true, /.play.js$/))

