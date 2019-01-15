const { pg } = require('./database')


async function main(){

  const { now } = (await pg.query('SELECT NOW() as now')).rows[0]

  console.log({ now })


}


main().then(
  () => {
    process.exit(0)
  },
  error => {
    console.error(error)
    process.exit(1)
  }
)
