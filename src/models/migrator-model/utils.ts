import { resolve } from 'node:path'

import { RunnerOption } from 'node-pg-migrate'
import { RunMigration } from 'node-pg-migrate/dist/migration'
import { ClientBase } from 'pg'

import { database, ServiceError } from '@/infra'

export const handler = async (
  fn: (dbClient: ClientBase) => Promise<RunMigration[]>
): Promise<RunMigration[]> => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    return await fn(dbClient)
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: 'Erro ao realizar operações de migração.',
      cause: error
    })
    throw serviceErrorObject
  } finally {
    await dbClient?.end()
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
    dir: resolve('src', 'infra', 'migrations'),
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
