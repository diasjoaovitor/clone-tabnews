import { NextResponse } from 'next/server'

import { controller } from '@/infra'
import { migrator } from '@/models'

const getHandler = async () => {
  const pendingMigrations = await migrator.listPendingMigrations()
  return NextResponse.json(pendingMigrations, {
    status: 200
  })
}

const postHandler = async () => {
  const migratedMigrations = await migrator.runPendingMigrations()
  const status = migratedMigrations.length > 0 ? 201 : 200
  return NextResponse.json(migratedMigrations, { status })
}

export const { GET, POST, DELETE, HEAD, OPTIONS, PATCH, PUT } = controller({
  GET: getHandler,
  POST: postHandler
})
