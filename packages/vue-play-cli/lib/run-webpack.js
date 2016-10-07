'use strict'
const chalk = require('chalk')
const webpack = require('webpack')
const server = require('webpack-hot-server')
const makeConfig = require('./make-config')

module.exports = function (options) {
  const config = makeConfig(options)

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
