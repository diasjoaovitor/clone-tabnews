const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  testTimeout: 60000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
})

module.exports = jestConfig
