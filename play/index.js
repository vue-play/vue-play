import {configure} from '../src/play'

import MyButton from './MyButton.vue'
import Box from './Box.vue'

const load = requireContext => {
  return requireContext.keys().map(requireContext)
}

const scenarios = load(require.context('./', true, /.play.js$/))

module.exports.components = {
  MyButton,
  Box
}

configure(scenarios, module)
