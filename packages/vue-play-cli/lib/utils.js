'use strict'
const path = require('path')

const _ = module.exports = {}

_.cwd = function cwd(file) {
  return path.resolve(process.cwd(), file || '')
}

_.dir = function dir(file) {
  return path.join(__dirname, '../', file || '')
}
