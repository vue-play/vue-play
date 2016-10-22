const requireAll = requireContext =>
  requireContext
    .keys()
    .filter(key => key !== './index.js')
    .map(requireContext)

export const registerModels = app => {
  const models = requireAll(require.context('./', true, /.*\.js$/))
  return models.map(model => app.model(model.default))
}
