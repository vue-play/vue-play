'use strict'
const path = require('path')
const webpack = require('webpack')
const server = require('webpack-hot-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function cwd(file) {
  return path.resolve(process.cwd(), file || '')
}

function dir(file) {
  return path.join(__dirname, '../', file || '')
}

module.exports = function runWebpack(options) {
  const postcss = [
    require('postcss-nested')
  ]

  const config = {
    entry: [
      options.entry,
      'style!vue-play/dist/vue-play.css'
    ],
    output: {
      path: cwd('play-dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolveLoader: {
      modules: [
        cwd('node_modules'),
        dir('node_modules')
      ]
    },
    resolve: {
      extensions: ['', '.js', '.vue', '.css'],
      modules: [
        cwd(),
        cwd('node_modules'),
        dir('node_modules')
      ]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: [/node_modules/]
        },
        {
          test: /\.css$/,
          loader: 'css!postcss',
          fallbackLoader: 'style'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: dir('lib/template.html')
      })
    ],
    babel: {
      presets: [
        [require.resolve('babel-preset-es2015'), {modules: options.modules}],
        require.resolve('babel-preset-stage-2')
      ],
      plugins: [
        require.resolve('babel-plugin-transform-runtime'),
        require.resolve('babel-plugin-transform-vue-jsx')
      ]
    },
    postcss,
    vue: {
      postcss
    }
  }

  const app = server({
    config,
    webpack,
    hot: false
  })

  app.listen(4000, () => {
    console.log(`http://localhost:4000`)
  })
}
