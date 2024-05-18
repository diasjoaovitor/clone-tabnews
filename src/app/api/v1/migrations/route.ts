import { NextResponse } from 'next/server'
import { ClientBase } from 'pg'
import migrationRunner, { RunnerOption } from 'node-pg-migrate'
import { join } from 'path'
import { database } from '@/infra/database'

const getDefaultMigrationOptions = ({
  dbClient,
  dryRun
}: {
  dbClient: ClientBase
  dryRun: boolean
}) => {
  const options: RunnerOption = {
    dir: join('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dbClient,
    dryRun
  }
  return options
}

export const GET = async () => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: true
    })
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)
    return NextResponse.json(pendingMigrations, {
      status: 200
    })
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await dbClient?.end()
  }
}

export const POST = async () => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: false
    })
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    const status = migratedMigrations.length > 0 ? 201 : 200
    return NextResponse.json(migratedMigrations, { status })
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await dbClient?.end()
  }
}
