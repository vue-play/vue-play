const requireAll = requireContext =>
  requireContext.keys().map(requireContext)

export const registerModels = app => {
  const models = requireAll(require.context('./', true, /^(?!.*index)\.js$/))
  return models.map(model => app.model(model))
}
