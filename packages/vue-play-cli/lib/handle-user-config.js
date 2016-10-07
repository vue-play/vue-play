'use strict'

module.exports = function (config, userConfig) {
  const postcss = userConfig.postcss
  const babel = userConfig.babel
  const loaders = userConfig.loaders
  if (postcss) {
    config.postcss = config.vue.postcss = postcss
  }
  if (babel) {
    config.babel = babel
  }
  if (loaders) {
    config.module.loaders = config.module.loaders.concat(loaders)
  }
  return config
}
