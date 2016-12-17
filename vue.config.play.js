const config = require('./vue.config.cjs')

module.exports = {
  title: 'Vue Play',
  dist: 'play-dist',
  live: true,
  resolve: true,
  alias: {
    vue: 'vue/dist/vue'
  },
  postcss: config.postcss,
  entry: {
    app: './play/app.js',
    preview: './play/preview.js'
  },
  templates: [
    {
      template: 'template.html',
      chunks: ['app'],
      filename: 'index.html'
    },
    {
      template: 'template.html',
      chunks: ['preview'],
      filename: 'preview.html'
    }
  ]
}
