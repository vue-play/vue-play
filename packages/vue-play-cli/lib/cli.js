'use strict'
const cac = require('cac')
const update = require('update-notifier')
const chalk = require('chalk')
const play = require('./')

const cli = cac()
update({pkg: cli.pkg}).notify()

cli
  .option('production, p', 'Play in production mode', false)
  .option('config, c', 'Specfic custom user config')
  .option('webpack-config, wc', 'Specific custom webpack config')
  .option('dist, d', 'Dist folder name')
  .option('clean', 'Remove dist directory before bundling in production mode', true)
  .option('css-modules', 'Load css with css-modules', false)
  .option('exclude-runtime', 'Exclude runtime for compiling vue template', false)

cli.usage(`${chalk.yellow('vue-play')} [entry] <options>`)

cli.command('*', 'Run vue-play', (input, flags) => {
  const options = Object.assign({
    entry: input[0]
  }, flags)
  return play(options)
})

cli.handleError = err => {
  console.log(err.stack)
  process.exit(1)
}

cli.parse()
