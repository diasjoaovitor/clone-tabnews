import migrationRunner from 'node-pg-migrate'
import { RunMigration } from 'node-pg-migrate/dist/migration'
import { ClientBase } from 'pg'

import { getDefaultMigrationOptions, handler } from './utils'

const listPendingMigrations = async (
  dbClient: ClientBase
): Promise<RunMigration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient,
    dryRun: true
  })
  const pendingMigrations = await migrationRunner(defaultMigrationOptions)
  return pendingMigrations
}

const runPendingMigrations = async (
  dbClient: ClientBase
): Promise<RunMigration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient,
    dryRun: false
  })
  const migratedMigrations = await migrationRunner(defaultMigrationOptions)
  return migratedMigrations
}

export const migratorModel = {
  listPendingMigrations: (): Promise<RunMigration[]> =>
    handler(listPendingMigrations),
  runPendingMigrations: (): Promise<RunMigration[]> =>
    handler(runPendingMigrations)
}
