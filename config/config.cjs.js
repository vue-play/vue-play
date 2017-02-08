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
  disableCompress: true,
  postcss: config.postcss,
  webpack: {
    devtool: false,
    output: {
      libraryTarget: 'commonjs2'
    },
    resolve: {
      modules: [
        path.resolve('src')
      ],
      alias: {
        vue: 'vue/dist/vue'
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: [/node_modules/],
          options: {
            configFile: path.resolve('.eslintrc'),
            useEslintrc: false,
            fix: true
          }
        }
      ]
    },
    externals: [
      'vue',
      'vuex',
      'vue-router',
      'vuex-router-sync',
      'highlight.js/lib/highlight',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/json',
      'highlight.js/lib/languages/xml',
      'uid',
      'vue-slim-modal',
      'query-string',
      'array-find-index'
    ]
  }
}
