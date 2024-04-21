import { Client } from 'pg'

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as number | undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  })
  await client.connect()
  return client
}

const query = async (
  query: string | { text: string; values: (number | string)[] },
  args?: string[]
) => {
  let client
  try {
    client = await getNewClient()
    const result = await client.query(query, args)
    return result
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await client?.end()
  }
}

export const database = {
  query
}
