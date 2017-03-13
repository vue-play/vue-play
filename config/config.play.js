const path = require('path')
const config = require('./')

module.exports = {
  entry: {
    app: './play/app.js',
    preview: './play/preview.js'
  },
  dist: 'dist-play',
  postcss: config.postcss,
  templateCompiler: true,
  webpack: {
    resolve: {
      modules: [
        path.resolve('src')
      ]
    }
  },
  // add hmr client to these entries
  hmrEntry: ['app', 'preview'],
  // produce html files for these entries
  html: [
    {title: 'Vue-Play Panel', chunks: ['app']},
    {title: 'Vue-Play Preview', chunks: ['preview'], filename: 'preview.html'}
  ]
}
