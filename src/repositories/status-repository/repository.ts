import { QueryResult, QueryResultRow } from 'pg'

import { database } from '@/infra/database'

const getServerVersion = async (): Promise<string> => {
  const { rows } = (await database.query(
    'show server_version;'
  )) as QueryResult<QueryResultRow>
  const [{ server_version }] = rows

  return server_version
}

const getMaxConnections = async (): Promise<number> => {
  const { rows } = (await database.query(
    'show max_connections;'
  )) as QueryResult<QueryResultRow>
  const [{ max_connections }] = rows

  return Number(max_connections)
}

const getOpenedConnections = async (): Promise<number> => {
  const databaseName = process.env.POSTGRES_DB
  const { rows } = (await database.query({
    text: 'select count(*)::int from pg_stat_activity where datname = $1;',
    values: [databaseName]
  })) as QueryResult<QueryResultRow>
  const [{ count }] = rows

  return count
}

export const statusRepository = {
  getServerVersion,
  getMaxConnections,
  getOpenedConnections
}
