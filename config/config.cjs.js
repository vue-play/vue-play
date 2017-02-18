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
  format: 'cjs',
  sourceMap: false,
  postcss: config.postcss,
  webpack: {
    resolve: {
      modules: [
        path.resolve('src')
      ],
      alias: {
        vue: 'vue/dist/vue'
      }
    },
    externals: [
      './play'
    ]
  }
}
