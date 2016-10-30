export default {
  log(data) {
    parent.postMessage({
      type: 'ACTION_LOG',
      payload: data
    }, location.origin)
  },
  clear() {
    parent.postMessage({
      type: 'CLEAR_CURRENT_LOGS'
    }, location.origin)
  }
}
