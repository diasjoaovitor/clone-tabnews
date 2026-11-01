import { attachDatabasePool } from '@vercel/functions'
import {
  Client,
  DatabaseError,
  Pool,
  PoolClient,
  QueryResult,
  QueryResultRow
} from 'pg'

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

const connectionConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
    ? Number(process.env.POSTGRES_PORT)
    : undefined,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.NODE_ENV === 'production'
}

const createPool = (): Pool => {
  const pool = new Pool({
    ...connectionConfig,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000,
    // Lets the test runner exit with idle clients in the pool, without closing it on teardown
    allowExitOnIdle: true
  })
  // An idle client that loses its connection emits `error` on the pool, which crashes the process
  // when nobody listens: https://node-postgres.com/apis/pool#events
  pool.on('error', (error) => console.error(error))
  // Releases the idle clients before Fluid Compute suspends the function:
  // https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#database-connection-pool-management
  attachDatabasePool(pool)
  return pool
}

const pool = createPool()

export type DatabaseClient = PoolClient

type QueryInput = string | { text: string; values: unknown[] }

const connect = async (): Promise<PoolClient> => {
  try {
    return await pool.connect()
  } catch (error) {
    throw createConnectionError(error)
  }
}

const getNewClient = async (): Promise<Client> => {
  const client = new Client(connectionConfig)
  try {
    await client.connect()
  } catch (error) {
    throw createConnectionError(error)
  }
  return client
}

const runQuery = async <Row extends QueryResultRow>(
  client: DatabaseClient,
  query: QueryInput,
  values?: unknown[]
): Promise<QueryResult<Row>> => {
  try {
    return await client.query<Row>(query, values)
  } catch (error) {
    throw mapConnectionError(error)
  }
}

const query = async <Row extends QueryResultRow = never>(
  query: QueryInput,
  values?: unknown[],
  client?: DatabaseClient
): Promise<QueryResult<Row>> => {
  if (client) return runQuery<Row>(client, query, values)
  const poolClient = await connect()
  try {
    const result = await runQuery<Row>(poolClient, query, values)
    poolClient.release()
    return result
  } catch (error) {
    // A client that lost its connection is destroyed instead of going back to the pool
    poolClient.release(error instanceof ServiceError)
    throw error
  }
}

const transaction = async <T>(
  callback: (client: DatabaseClient) => Promise<T>
): Promise<T> => {
  const client = await connect()
  try {
    await runQuery(client, 'BEGIN')
    const result = await callback(client)
    await runQuery(client, 'COMMIT')
    client.release()
    return result
  } catch (error) {
    try {
      await client.query('ROLLBACK')
      client.release()
    } catch {
      // A failed ROLLBACK means the connection is gone, so the client is destroyed instead of reused
      client.release(true)
    }
    throw error
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
  transaction,
  getRequiredRow,
  getNewClient,
  mapConnectionError
}
