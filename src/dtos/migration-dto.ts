import { Migration } from '@/models/migrator-model/types'

export type MigrationDto = Migration[]

export const getMigrationDto = (migrations: Migration[]): MigrationDto => {
  return migrations.map((migration) => ({
    path: migration.path,
    name: migration.name,
    timestamp: migration.timestamp
  }))
}
