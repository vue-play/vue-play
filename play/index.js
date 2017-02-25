import MyButton from './MyButton.vue'
import Box from './Box.vue'

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const load = requireContext => {
  return requireContext.keys().map(requireContext)
}

load(require.context('./', true, /.play.js$/))

