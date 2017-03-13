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
  templateCompiler: true,
  webpack: {
    resolve: {
      modules: [
        path.resolve('src')
      ]
    },
    externals: [
      './play'
    ]
  }
}
