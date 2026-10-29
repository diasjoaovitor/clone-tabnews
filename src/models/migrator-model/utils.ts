import path from 'node:path'

import { RunnerOption } from 'node-pg-migrate'
import { ClientBase } from 'pg'

import { database, ServiceError } from '@/infra'

import { TRunMigration } from './types'

export const handler = async (
  operation: (client: ClientBase) => Promise<TRunMigration[]>
): Promise<TRunMigration[]> => {
  let client
  try {
    client = await database.getNewClient()
    return await operation(client)
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: 'Erro ao realizar operações de migração.',
      cause: error
    })
    throw serviceErrorObject
  } finally {
    await client?.end()
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
