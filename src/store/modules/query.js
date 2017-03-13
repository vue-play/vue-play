export default {
  getters: {
    getQuery(state, getters) {
      return {
        ...getters.currentScenario,
        ...getters.layoutQuery,
        ...getters.filterQuery
      }
    }
  }
}
