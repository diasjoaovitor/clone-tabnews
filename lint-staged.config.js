import path from 'node:path'
import { fileURLToPath } from 'node:url'

const buildCommand = (stagedFiles) => {
  const files = stagedFiles.map((f) =>
    path.relative(path.dirname(fileURLToPath(import.meta.url)), f)
  )

  return [
    `pnpm eslint:fix ${files.join(' ')}`,
    `pnpm prettier:fix --file ${files.join(' --file ')}`,
    `pnpm jest --runInBand --findRelatedTests ${files.join(' ')} --passWithNoTests`
  ]
}

export default {
  '*': [buildCommand]
}
