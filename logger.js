const path = require('path')
const util = require('util')
const winston = require('winston')

require('./environment')

const level = process.env.LOG_LEVEL || 'debug'

const inspect = object =>
  util.inspect(object, { showHidden: true, depth: null })

const transports = []
transports.push(
  new winston.transports.File({
    level,
    filename: path.resolve(__dirname, `logs/${process.env.NODE_ENV}.log`),
    handleExceptions: true,
    showLevel: true,
    timestamp: true,
    format: winston.format.simple(),
  })
)

if (process.env.LOG_TO_CONSOLE === '1'){
  transports.push(
    new winston.transports.Console({
      level,
      handleExceptions: false,
      showLevel: true,
      format: winston.format.simple(),
    })
  )
}

const logger = winston.createLogger({
  level,
  json: false,
  prettyPrint: inspect,
  exitOnError: false,
  transports,
})

module.exports = logger
