import status from '@/server/models/status'

export const Info = async () => {
  const {
    dependencies: {
      database: { max_connections, opened_connections, version }
    },
    updated_at
  } = await status.check()

  return (
    <>
      <p>Última atualização: {updated_at}</p>
      <p>Banco de Dados</p>
      <ul>
        <li>Versão: {version}</li>
        <li>Conexões abertas: {opened_connections}</li>
        <li>Conexões máximas: {max_connections}</li>
      </ul>
    </>
  )
}
