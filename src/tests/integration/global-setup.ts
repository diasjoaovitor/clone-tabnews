import { type ChildProcess, execSync, spawn } from 'node:child_process'

import retry from 'async-retry'
import type { TestProject } from 'vitest/node'

const run = (command: string) => execSync(command, { stdio: 'inherit' })

const isServerUp = async (statusUrl: string) => {
  try {
    const response = await fetch(statusUrl)
    return response.ok
  } catch {
    return false
  }
}

const waitForServer = async (statusUrl: string) => {
  await retry(
    async () => {
      if (!(await isServerUp(statusUrl))) {
        throw new Error('Server not ready')
      }
    },
    { retries: 120, minTimeout: 100, maxTimeout: 1000 }
  )
}

const areServicesUp = () =>
  execSync('docker compose -f src/infra/compose.yml ps -q').toString().trim()
    .length > 0

const setup = async (project: TestProject) => {
  const statusUrl = `${project.config.env.NEXT_PUBLIC_BASE_URL}/api/v1/status`

  if (await isServerUp(statusUrl)) {
    return
  }

  const servicesWereUp = areServicesUp()
  run('pnpm services:up && pnpm services:wait:database && pnpm migrations:up')

  const server: ChildProcess = spawn('pnpm', ['exec', 'next', 'dev'], {
    // Vitest sets NODE_ENV to `test`, a value `next dev` warns about
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'ignore',
    // Its own process group, so the teardown also stops the processes `next dev` spawns
    detached: true
  })

  await waitForServer(statusUrl)

  return () => {
    if (server.pid) {
      process.kill(-server.pid, 'SIGTERM')
    }
    if (!servicesWereUp) {
      run('pnpm services:down')
    }
  }
}

export default setup
