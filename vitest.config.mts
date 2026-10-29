import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      // Next.js resolves `server-only` internally; outside it the import has to be a no-op, as
      // `next/jest` did
      'server-only': 'next/dist/compiled/server-only/empty.js'
    }
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: [...configDefaults.exclude, 'src/tests/**'],
          setupFiles: ['vitest.setup.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          include: ['src/tests/integration/**/*.test.ts'],
          // Vite's `loadEnv` would also read `.env`, which holds the hosted database URL
          env: parseEnv(readFileSync('.env.development', 'utf8')),
          globalSetup: ['src/tests/integration/global-setup.ts'],
          // The files share one database and one Mailpit inbox
          fileParallelism: false,
          testTimeout: 60_000
        }
      }
    ]
  }
})
