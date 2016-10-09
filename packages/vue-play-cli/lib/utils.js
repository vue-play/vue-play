'use strict'
const path = require('path')

const _ = module.exports = {}

_.cwd = function (file) {
  return path.resolve(process.cwd(), file || '')
}

_.dir = function (file) {
  return path.join(__dirname, '../', file || '')
}
