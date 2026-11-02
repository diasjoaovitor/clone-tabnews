import { database } from '@/infra/database'

const getServerVersion = async (): Promise<string> => {
  const { server_version } = database.getRequiredRow(
    await database.query<{ server_version: string }>('show server_version;')
  )

  return server_version
}

const getMaxConnections = async (): Promise<number> => {
  const { max_connections } = database.getRequiredRow(
    await database.query<{ max_connections: string }>('show max_connections;')
  )

  return Number(max_connections)
}

const getOpenedConnections = async (): Promise<number> => {
  const databaseName = process.env.POSTGRES_DB
  const { count } = database.getRequiredRow(
    await database.query<{ count: number }>({
      text: 'select count(*)::int from pg_stat_activity where datname = $1;',
      values: [databaseName]
    })
  )

  return count
}

export const statusRepository = {
  getServerVersion,
  getMaxConnections,
  getOpenedConnections
}
