import { statusModel } from '@/models'

export const Info = async () => {
  const {
    dependencies: {
      database: { max_connections, opened_connections, version }
    },
    updated_at
  } = await statusModel.check()

  return (
    <>
      <p>Última atualização: {updated_at.toISOString()}</p>
      <p>Banco de Dados</p>
      <ul>
        <li>Versão: {version}</li>
        <li>Conexões abertas: {opened_connections}</li>
        <li>Conexões máximas: {max_connections}</li>
      </ul>
    </>
  )
}
