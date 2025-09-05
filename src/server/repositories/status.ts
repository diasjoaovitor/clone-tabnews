import { QueryResult, QueryResultRow } from 'pg'

import database from '@/infra/database'

const getServerVersion = async () => {
  const {
    rows: [{ server_version }]
  } = (await database.query(
    'show server_version;'
  )) as QueryResult<QueryResultRow>

  return server_version
}

const getMaxConnections = async () => {
  const {
    rows: [{ max_connections }]
  } = (await database.query(
    'show max_connections;'
  )) as QueryResult<QueryResultRow>

  return max_connections
}

const getOpenedConnections = async () => {
  const databaseName = process.env.POSTGRES_DB as string
  const {
    rows: [{ count }]
  } = (await database.query({
    text: 'select count(*)::int from pg_stat_activity where datname = $1;',
    values: [databaseName]
  })) as QueryResult<QueryResultRow>

  return count
}

const statusRepository = {
  getServerVersion,
  getMaxConnections,
  getOpenedConnections
}

export default statusRepository
