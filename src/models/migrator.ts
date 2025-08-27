import { resolve } from 'node:path'

import migrationRunner, { RunnerOption } from 'node-pg-migrate'
import { RunMigration } from 'node-pg-migrate/dist/migration'
import { ClientBase } from 'pg'

import database from '@/infra/database'
import { ServiceError } from '@/infra/errors'

const getDefaultMigrationOptions = ({
  dbClient,
  dryRun
}: {
  dbClient: ClientBase
  dryRun: boolean
}) => {
  const options: RunnerOption = {
    dir: resolve('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dbClient,
    dryRun
  }
  if (process.env.NODE_ENV === 'test') {
    return { ...options, log: () => {} }
  }
  return options
}

const handler = async (
  fn: (dbClient: ClientBase) => Promise<RunMigration[]>
) => {
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

const listPendingMigrations = async () =>
  await handler(async (dbClient) => {
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: true
    })
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)
    return pendingMigrations
  })

const runPendingMigrations = async () =>
  await handler(async (dbClient) => {
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: false
    })
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    return migratedMigrations
  })

const migrator = {
  listPendingMigrations,
  runPendingMigrations
}

export default migrator
