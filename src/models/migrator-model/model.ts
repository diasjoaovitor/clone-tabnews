import { runner } from 'node-pg-migrate'
import { ClientBase } from 'pg'

import { TRunMigration } from './types'
import { getDefaultMigrationOptions, handler } from './utils'

const listPendingMigrations = async (
  client: ClientBase
): Promise<TRunMigration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient: client,
    dryRun: true
  })
  const pendingMigrations = await runner(defaultMigrationOptions)
  return pendingMigrations
}

const runPendingMigrations = async (
  client: ClientBase
): Promise<TRunMigration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient: client,
    dryRun: false
  })
  const migratedMigrations = await runner(defaultMigrationOptions)
  return migratedMigrations
}

export const migratorModel = {
  listPendingMigrations: (): Promise<TRunMigration[]> =>
    handler(listPendingMigrations),
  runPendingMigrations: (): Promise<TRunMigration[]> =>
    handler(runPendingMigrations)
}
