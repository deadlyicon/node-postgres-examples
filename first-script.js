/ first script
// Query records from table and output to stdout
const query = async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM public.esh_line_items')
    process.stdout.write(JSON.stringify(res.rows))
  } finally {
    client.release()
  }
}

query().catch(e => console.log(e.stack))
