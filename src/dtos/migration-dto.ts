import { TRunMigration } from '@/models'
import { TGetDto } from '@/types'

export type TMigrationDto = TRunMigration[]

export const getMigrationDto: TGetDto<TRunMigration[], TMigrationDto> = (
  _,
  migrations
) => {
  return migrations.map((migration) => ({
    path: migration.path,
    name: migration.name,
    timestamp: migration.timestamp
  }))
}
