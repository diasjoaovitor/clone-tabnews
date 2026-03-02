import { QueryResult, QueryResultRow } from 'pg'

import { database } from '@/infra'

const getServerVersion = async (): Promise<string> => {
  const {
    rows: [{ server_version }]
  } = (await database.query(
    'show server_version;'
  )) as QueryResult<QueryResultRow>

  return server_version
}

const getMaxConnections = async (): Promise<number> => {
  const {
    rows: [{ max_connections }]
  } = (await database.query(
    'show max_connections;'
  )) as QueryResult<QueryResultRow>

  return Number(max_connections)
}

const getOpenedConnections = async (): Promise<number> => {
  const databaseName = process.env.POSTGRES_DB as string
  const {
    rows: [{ count }]
  } = (await database.query({
    text: 'select count(*)::int from pg_stat_activity where datname = $1;',
    values: [databaseName]
  })) as QueryResult<QueryResultRow>

  return count
}

export const statusRepository = {
  getServerVersion,
  getMaxConnections,
  getOpenedConnections
}
