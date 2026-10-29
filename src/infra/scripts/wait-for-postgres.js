import { exec } from 'node:child_process'

const checkPostgres = (tries = 60) => {
  exec('docker exec postgres-tbn pg_isready --host localhost', (_, stdout) => {
    if (tries === 0) {
      console.error(
        '\n\n🔴 Não foi possível estabelecer a conexão com o Postgres. Verifique se ele está rodando\n'
      )
      process.exit(1)
    }

    if (!stdout.includes('accepting connections')) {
      process.stdout.write('.')
      setTimeout(() => checkPostgres(tries - 1), 1000)
      return
    }

    console.log('\n\n🟢 Postgres está pronto e aceitando conexões!\n')
  })
}

process.stdout.write('\n\n🔴 Aguardando Postgres aceitar conexões')
checkPostgres()
