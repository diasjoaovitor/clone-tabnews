import { Client, DatabaseError, QueryResult, QueryResultRow } from 'pg'

import { ServiceError } from './errors'

// SQLSTATE class 08 (connection exception), code 53300 (too many connections) and codes 57P0x (the
// server is shutting down or not accepting connections):
// https://www.postgresql.org/docs/current/errcodes-appendix.html
const CONNECTION_SQLSTATE = /^(08|53300|57P0)/

const CONNECTION_ERRNO = new Set([
  'ECONNREFUSED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ENOTFOUND',
  'EAI_AGAIN',
  'EPIPE',
  'ETIMEDOUT'
])

// `pg` reports a connection lost after `connect()` succeeded as a plain `Error`, with no code
const CONNECTION_MESSAGES = new Set([
  'Connection terminated unexpectedly',
  'Client has encountered a connection error and is not queryable',
  'timeout expired'
])

const isConnectionError = (error: unknown): boolean => {
  if (error instanceof DatabaseError) {
    return CONNECTION_SQLSTATE.test(error.code ?? '')
  }
  if (!(error instanceof Error)) return false
  const { code } = error as NodeJS.ErrnoException
  return (
    (code !== undefined && CONNECTION_ERRNO.has(code)) ||
    CONNECTION_MESSAGES.has(error.message)
  )
}

const createConnectionError = (cause: unknown): ServiceError =>
  new ServiceError({
    message: 'Não foi possível conectar ao banco de dados.',
    action: 'Verifique se o banco de dados está disponível.',
    cause
  })

// Only a lost connection is a `503`: any other database error is a bug, which retrying won't fix
const mapConnectionError = (error: unknown): unknown =>
  isConnectionError(error) ? createConnectionError(error) : error

const getNewClient = async (): Promise<Client> => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
      ? Number(process.env.POSTGRES_PORT)
      : undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'production'
  })
  try {
    await client.connect()
  } catch (error) {
    throw createConnectionError(error)
  }
  return client
}

const query = async <Row extends QueryResultRow = never>(
  query: string | { text: string; values: unknown[] },
  values?: unknown[]
): Promise<QueryResult<Row>> => {
  const client = await getNewClient()
  try {
    return await client.query<Row>(query, values)
  } catch (error) {
    throw mapConnectionError(error)
  } finally {
    await client.end()
  }
}

const getRequiredRow = <Row extends QueryResultRow>({
  rows
}: QueryResult<Row>): Row => {
  const [row] = rows
  if (!row) throw new Error('The query returned no row.')
  return row
}

export const database = {
  query,
  getRequiredRow,
  getNewClient,
  mapConnectionError
}
