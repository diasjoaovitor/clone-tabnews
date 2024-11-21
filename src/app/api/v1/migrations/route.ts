import { NextRequest, NextResponse } from 'next/server'
import { ClientBase } from 'pg'
import migrationRunner, { RunnerOption } from 'node-pg-migrate'
import { join } from 'path'
import database from '@/infra'
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
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await dbClient?.end()
  }
}

export const GET = async () =>
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

export const POST = async () =>
  await handler(async (dbClient) => {
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: false
    })
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    const status = migratedMigrations.length > 0 ? 201 : 200
    return NextResponse.json(migratedMigrations, { status })
  })

const notAllowedHandler = (request: NextRequest) =>
  NextResponse.json(
    { error: `Method ${request.method} not allowed` },
    { status: 405 }
  )

export const PUT = notAllowedHandler
export const DELETE = notAllowedHandler
export const PATCH = notAllowedHandler
export const HEAD = notAllowedHandler
export const OPTIONS = notAllowedHandler
