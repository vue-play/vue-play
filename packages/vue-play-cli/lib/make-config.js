'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function cwd(file) {
  return path.resolve(process.cwd(), file || '')
}

function dir(file) {
  return path.join(__dirname, '../', file || '')
}

module.exports = function runWebpack(options) {
  const postcss = [
    require('postcss-nested'),
    require('postcss-simple-vars')
  ]

  let config = {
    entry: [
      'style!vue-play/dist/vue-play.css',
      options.entry
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
          test: /\.vue$/,
          loader: 'vue'
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
      loaders: {},
      postcss
    }
  }

  if (options.production) {
    config.devtool = 'source-map'
    config.output.filename = '[name].[chunkhash:8].js'
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      new ExtractTextPlugin('[name].[contenthash:8].css')
    )
    config.module.loaders.push(
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css?sourceMap&-autoprefixer&minimize!postcss'
        })
      }
    )
    config.vue.loaders.css = ExtractTextPlugin.extract({
      fallbackLoader: 'vue-style-loader',
      loader: 'css?sourceMap&-autoprefixer&minimize'
    })
    webpack(config, (err, stats) => {
      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }))
    })
  } else {
    config.devtool = 'eval-source-map'
    config.entry.push(dir('node_modules/webpack-hot-middleware/client'))
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
    config.module.loaders.push(
      {
        test: /\.css$/,
        loader: 'css!postcss',
        fallbackLoader: 'style'
      }
    )
  }


  let userConfig
  if (options.config) {
    userConfig = require(cwd(options.config))
    if (typeof userConfig === 'function') {
      config = userConfig(config, options)
    } else if (typeof userConfig === 'object') {
      config = userConfig
    }
  }

  return config
}
