'use strict'
const path = require('path')
const pathExists = require('path-exists')
const trash = require('trash')
const merge = require('lodash.merge')
const runWebpack = require('./run-webpack')
const _ = require('./utils')

module.exports = function (options) {
  let userConfig = {}
  if (options.config) {
    try {
      userConfig = require(_.cwd(options.config === true ? 'play.config' : options.config))
    } catch (err) {
      userConfig = {}
    }
  }
  options = merge({
    entry: './play.js',
    dist: 'play-dist',
    port: 5000
  }, userConfig, options)

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
