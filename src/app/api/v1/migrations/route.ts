import { NextResponse } from 'next/server'

import { getMigrationDto } from '@/dtos/migration-dto'
import { controller } from '@/infra/controller'
import { migratorModel } from '@/models/migrator-model/model'

const getHandler = async () => {
  const pendingMigrations = await migratorModel.listPendingMigrations()
  return NextResponse.json(getMigrationDto(null, pendingMigrations), {
    status: 200
  })
}

const postHandler = async () => {
  const migratedMigrations = await migratorModel.runPendingMigrations()
  const status = migratedMigrations.length > 0 ? 201 : 200
  return NextResponse.json(getMigrationDto(null, migratedMigrations), {
    status
  })
}

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = controller({
  GET: { handler: getHandler, feature: 'read:migration' },
  POST: { handler: postHandler, feature: 'create:migration' }
})
