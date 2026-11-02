import { runner } from 'node-pg-migrate'
import { ClientBase } from 'pg'

import { Migration } from './types'
import { getDefaultMigrationOptions, handler } from './utils'

const listPendingMigrations = async (
  client: ClientBase
): Promise<Migration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient: client,
    dryRun: true
  })
  const pendingMigrations = await runner(defaultMigrationOptions)
  return pendingMigrations
}

const runPendingMigrations = async (
  client: ClientBase
): Promise<Migration[]> => {
  const defaultMigrationOptions = getDefaultMigrationOptions({
    dbClient: client,
    dryRun: false
  })
  const migratedMigrations = await runner(defaultMigrationOptions)
  return migratedMigrations
}

export const migratorModel = {
  listPendingMigrations: (): Promise<Migration[]> =>
    handler(listPendingMigrations),
  runPendingMigrations: (): Promise<Migration[]> =>
    handler(runPendingMigrations)
}
