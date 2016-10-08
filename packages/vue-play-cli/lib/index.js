'use strict'
const path = require('path')
const pathExists = require('path-exists')
const trash = require('trash')
const runWebpack = require('./run-webpack')

module.exports = function (options) {
  options = Object.assign({}, options)
  options.entry = options.entry || './play.js'
  options.dist = options.dist || 'play-dist'

  const entry = path.resolve(options.entry)
  return pathExists(entry)
    .then(exists => {
      if (!exists) throw new Error('No play entry was found!')
      if (options.clean !== false && options.production) return trash([options.dist])
    })
    .then(() => {
      return runWebpack(options)
    })
}
