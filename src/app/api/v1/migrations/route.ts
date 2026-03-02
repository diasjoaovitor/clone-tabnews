import { NextResponse } from 'next/server'

import { controller } from '@/infra'
import { migratorModel } from '@/models'

const getHandler = async () => {
  const pendingMigrations = await migratorModel.listPendingMigrations()
  return NextResponse.json(pendingMigrations, {
    status: 200
  })
}

const postHandler = async () => {
  const migratedMigrations = await migratorModel.runPendingMigrations()
  const status = migratedMigrations.length > 0 ? 201 : 200
  return NextResponse.json(migratedMigrations, { status })
}

export const { GET, POST, DELETE, HEAD, OPTIONS, PATCH, PUT } =
  controller.handle({
    GET: getHandler,
    POST: postHandler
  })
