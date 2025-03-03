import { NextResponse } from 'next/server'
import { ClientBase } from 'pg'
import migrationRunner, { RunnerOption } from 'node-pg-migrate'
import { join } from 'path'
import database, { controller } from '@/infra'
import { RunMigration } from 'node-pg-migrate/dist/migration'

const getDefaultMigrationOptions = ({
  dbClient,
  dryRun
}: {
  dbClient: ClientBase
  dryRun: boolean
}) => {
  const options: RunnerOption = {
    dir: join(process.cwd(), 'src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dbClient,
    dryRun
  }
  return options
}

const handler = async (
  fn: (dbClient: ClientBase) => Promise<NextResponse<RunMigration[]>>
) => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    return await fn(dbClient)
  } finally {
    await dbClient?.end()
  }
}

const getHandler = async () =>
  await handler(async (dbClient) => {
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: true
    })
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)
    return NextResponse.json(pendingMigrations, {
      status: 200
    })
  })

const postHandler = async () =>
  await handler(async (dbClient) => {
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: false
    })
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    const status = migratedMigrations.length > 0 ? 201 : 200
    return NextResponse.json(migratedMigrations, { status })
  })

export const { GET, POST, DELETE, HEAD, OPTIONS, PATCH, PUT } = controller({
  GET: getHandler,
  POST: postHandler
})
