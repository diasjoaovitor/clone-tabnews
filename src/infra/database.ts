import { Client } from 'pg'

import { ServiceError } from './errors'

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as number | undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'production'
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
    const serviceErrorObject = new ServiceError({
      message: 'Erro na conexão com Banco ou na Query.',
      cause: error
    })
    throw serviceErrorObject
  } finally {
    await client?.end()
  }
}

export const database = {
  query,
  getNewClient
}
