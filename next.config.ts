import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  // node-pg-migrate reads the migrations folder at runtime, so file tracing doesn't see the files
  outputFileTracingIncludes: {
    '/api/v1/migrations': ['./src/infra/migrations/**/*']
  }
}

export default nextConfig
