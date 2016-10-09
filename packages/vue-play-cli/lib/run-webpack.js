'use strict'
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const server = require('webpack-hot-server')
const logUpdate = require('log-update')
const symbols = require('log-symbols')
const tildify = require('tildify')
const makeConfig = require('./make-config')

module.exports = function (options) {
  const config = makeConfig(options)

  if (options.production) {
    logUpdate(chalk.bold('Bundling play spot for your components...\n'))
    webpack(config, (err, stats) => {
      if (err) {
        logUpdate(chalk.red(`${symbols.error} Error\n`))
        return console.error(err)
      }
      if (stats.hasErrors()) {
        logUpdate(chalk.red(`${symbols.error} Error\n`))
      } else {
        const friendlyPath = tildify(path.resolve(options.dist))
        logUpdate(chalk.green(`${symbols.success} Successfully bundled into ${chalk.underline(friendlyPath)}\n`))
      }
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

    const port = options.port
    app.listen(port, () => {
      console.log(chalk.bold(`> play at http://localhost:${port}`))
    })
  }
}
