'use strict';

require('./environment');

const { Pool } = require('pg')
// const logger = require('./logger')

const connectionString =  process.env.DATABASE_URL
const pool = new Pool({ connectionString })

pool.connect(error => {
  if (error){
    console.error(`failed to connect to database ${error}`, error)
    process.exit(1)
  }else{
    console.log(`connected to postgres database ${ connectionString}`)
  }
})

module.exports = {
  query: async function(text, params){
    console.log('PG QUERY:', text, params)
    const result = await pool.query(text, params)
    return result
  }
}
