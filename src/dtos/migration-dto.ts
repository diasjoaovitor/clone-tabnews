import { Migration } from '@/models/migrator-model/types'
import { DtoGetter } from '@/types/generics'

export type MigrationDto = Migration[]

export const getMigrationDto: DtoGetter<Migration[], MigrationDto> = (
  _,
  migrations
) => {
  return migrations.map((migration) => ({
    path: migration.path,
    name: migration.name,
    timestamp: migration.timestamp
  }))
}
