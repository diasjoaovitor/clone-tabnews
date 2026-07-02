import { RunMigration } from 'node-pg-migrate/dist/migration'

import { TGetDto } from '@/types'

export type TMigrationDto = RunMigration[]

export const getMigrationDto: TGetDto<RunMigration[], TMigrationDto> = (
  _,
  migrations
) => {
  return migrations.map((migration) => ({
    path: migration.path,
    name: migration.name,
    timestamp: migration.timestamp
  }))
}
