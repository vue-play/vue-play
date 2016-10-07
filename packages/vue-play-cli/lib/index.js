'use strict'
const path = require('path')
const pathExists = require('path-exists')
const runWebpack = require('./run-webpack')

module.exports = function (options) {
  options = Object.assign({}, options)
  options.entry = options.entry || './play.js'

  const entry = path.resolve(options.entry)
  return pathExists(entry)
    .then(exists => {
      if (!exists) throw new Error('No play entry was found!')
      return runWebpack(options)
    })
}
