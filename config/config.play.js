const path = require('path')
const config = require('./')
const hmrClientDir = path.join(__dirname, '../node_modules/poi/app/dev-client.es6')

module.exports = {
  entry: {
    app: './play/app.js',
    preview: './play/preview.js'
  },
  dist: 'dist-play',
  postcss: config.postcss,
  webpack (config) {
    ['app', 'preview'].forEach(entry => {
      config.entry[entry].unshift(hmrClientDir)
    })
    config.resolve.modules.push(path.resolve('src'))
    return config
  },
  // produce html files for these entries
  html: [
    {title: 'Vue-Play Panel', chunks: ['app']},
    {title: 'Vue-Play Preview', chunks: ['preview'], filename: 'preview.html'}
  ]
}
