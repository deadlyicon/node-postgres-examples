'use strict';

require('./environment');

const { Client } = require('pg')
const logger = require('./logger')

const connectionString =  process.env.DATABASE_URL
const client = new Client({ connectionString })

client.connect(error => {
  if (error){
    logger.error(`failed to connect to database ${error}`, error)
    process.exit(1)
  }else{
    logger.debug(`connected to postgres database ${ connectionString}`)
  }
})

module.exports.pg = client;
