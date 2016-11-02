const model = {
  actions: {
    cmdShiftK({dispatch}) {
      dispatch('toggleAllPanels')
    },
    cmdShiftL({dispatch}) {
      dispatch('toggleLeftPanel')
    },
    cmdShiftD({dispatch}) {
      dispatch('toggleBottomPanel')
    },
    cmdShiftLeft({dispatch}) {
      dispatch('playPrevious')
    },
    cmdShiftRight({dispatch}) {
      dispatch('playNext')
    }
  }
}

export default model
export const validShortcuts = Object.keys(model.actions)
