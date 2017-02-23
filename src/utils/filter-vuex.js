// Replacer function for JSON.stringify to filter Vuex instance from the tree
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
import get from 'lodash/get'

export default (key, value) => {
  if (key === 'store' && get(value, 'constructor.name') === 'Store') {
    return undefined
  }
  return value
}
