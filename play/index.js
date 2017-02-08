import MyButton from './MyButton.vue'
import Box from './Box.vue'

const load = requireContext => {
  return requireContext.keys().map(requireContext)
}

load(require.context('./', true, /.play.js$/))

