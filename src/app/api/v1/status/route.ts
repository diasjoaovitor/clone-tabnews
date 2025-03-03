import { NextResponse } from 'next/server'
import { QueryResult, QueryResultRow } from 'pg'
import database, { controller } from '@/infra'

export type TStatusBody = {
  updated_at: string
  dependencies: {
    database: {
      version: string
      max_connections: string
      opened_connections: number
    }
  }
}

const getHandler = async () => {
  const updatedAt = new Date().toISOString()

  const {
    rows: [{ server_version }]
  } = (await database.query(
    'show server_version;'
  )) as QueryResult<QueryResultRow>

  const {
    rows: [{ max_connections }]
  } = (await database.query(
    'show max_connections;'
  )) as QueryResult<QueryResultRow>

  const databaseName = process.env.POSTGRES_DB as string
  const {
    rows: [{ count }]
  } = (await database.query({
    text: 'select count(*)::int from pg_stat_activity where datname = $1;',
    values: [databaseName]
  })) as QueryResult<QueryResultRow>

  const body: TStatusBody = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: server_version,
        max_connections,
        opened_connections: count
      }
    }
  }
  return NextResponse.json(body, {
    status: 200
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } = controller({
  GET: getHandler
})
