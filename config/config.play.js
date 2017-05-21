const path = require('path')
const config = require('./')

module.exports = {
  entry: {
    app: [':hot:', './play/app.js'],
    preview: [':hot:', './play/preview.js']
  },
  dist: 'dist-play',
  postcss: config.postcss,
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'))
    return config
  },
  // produce html files for these entries
  html: [
    {title: 'Vue-Play Panel', chunks: ['app']},
    {title: 'Vue-Play Preview', chunks: ['preview'], filename: 'preview.html'}
  ]
}
