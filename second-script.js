//second script
const query = async () => {
  const client = await pool.connect()
  // create a new table if not exists
  try {

    await client.query('CREATE TABLE IF NOT EXISTS public.temp_hobbes(id integer PRIMARY KEY, data JSONB)')
    var chunks = [];

    await process.stdin.on('readable', async () => {
      const chunk = process.stdin.read()
      if (chunk) {
        chunks.push(chunk)
        // console.log(JSON.p.toString())
        // var data = JSON.parse(JSON.stringify(chunk.toString()))
        // console.log(typeof data)
        // await data.map((datum) => {
        //   console.log(datum)
        //   client.query(`INSERT INTO public.temp_hobbes (data) VALUES(${datum})`)
        // })
      }
    })

    await process.stdin.on('end', async () => {
      var inputJSON = chunks.join()
      var parsedData = JSON.parse(inputJSON)
      // var outputJSON = JSON.stringify(parsedData, null, '')
      // process.stdout.write(outputJSON);
      // process.stdout.write('\n')
      parsedData.forEach(async (datum) => {
        console.log(datum)
        await client.query(`INSERT INTO public.temp_hobbes (data) VALUES(${datum})`)
      })
    })
  } catch (error) {
    console.error(error);
  } finally {
    await client.release()
  }
}

query().catch(e => console.log(e.stack))
