import path from 'node:path'

import { RunnerOption } from 'node-pg-migrate'
import { ClientBase } from 'pg'

import { database } from '@/infra/database'

import { Migration } from './types'

export const handler = async (
  operation: (client: ClientBase) => Promise<Migration[]>
): Promise<Migration[]> => {
  const client = await database.getNewClient()
  try {
    return await operation(client)
  } catch (error) {
    throw database.mapConnectionError(error)
  } finally {
    await client.end()
  }
}

export const getDefaultMigrationOptions = ({
  dbClient,
  dryRun
}: {
  dbClient: ClientBase
  dryRun: boolean
}): RunnerOption => {
  const options: RunnerOption = {
    dir: path.resolve('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dbClient,
    dryRun
  }
  if (process.env.NODE_ENV === 'test') {
    return { ...options, log: (): void => {} }
  }
  return options
}
