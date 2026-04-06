import { NextResponse } from 'next/server'

import { getMigrationDto } from '@/dtos'
import { controller } from '@/infra'
import { migratorModel } from '@/models'

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

export const { GET, POST, DELETE, HEAD, OPTIONS, PATCH, PUT } = controller({
  GET: { handler: getHandler, feature: 'read:migration' },
  POST: { handler: postHandler, feature: 'create:migration' }
})
