'use strict'
const chalk = require('chalk')
const webpack = require('webpack')
const server = require('webpack-hot-server')
const makeConfig = require('./make-config')

module.exports = function (options) {
  const config = makeConfig(options)

  if (options.production) {
    webpack(config, (err, stats) => {
      if (err) return console.error(err)
      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }))
    })
  } else {
    const app = server({
      config,
      webpack,
      hot: true
    })

    const port = options.port || 5000
    app.listen(port, () => {
      console.log(chalk.bold(`> play at http://localhost:${port}`))
    })
  }
}
