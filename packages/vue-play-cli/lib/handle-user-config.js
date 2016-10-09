'use strict'

module.exports = function (config, options) {
  const postcss = options.postcss
  const babel = options.babel
  const loaders = options.loaders
  const markdown = options.markdown
  if (postcss) {
    config.postcss = config.vue.postcss = postcss
  }
  if (babel) {
    config.babel = babel
  }
  if (loaders) {
    config.module.loaders = config.module.loaders.concat(loaders)
  }
  if (markdown) {
    Object.assign(config['markdown-it'], markdown)
  }
  return config
}
