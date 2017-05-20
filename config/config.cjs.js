const path = require('path')
const config = require('./')

module.exports = {
  entry: {
    play: './src/play.js',
    app: './src/app.js',
    preview: './src/preview.js'
  },
  filename: {
    js: '[name].js',
    css: '[name].css'
  },
  html: false,
  minimize: false,
  sourceMap: false,
  hotReload: false,
  postcss: config.postcss,
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'))
    config.externals.push('./play')
    return config
  }
}
