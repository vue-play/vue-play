'use strict'
const cac = require('cac')
const update = require('update-notifier')
const play = require('./')

const cli = cac()
update({pkg: cli.pkg}).notify()

cli
  .option('production, p', 'Play in production mode')

cli.command('*', 'Play a component', (input, flags) => {
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
