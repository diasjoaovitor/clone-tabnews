import { TStatusBody } from '@/app/api/v1/status/route'

const fetchApi = async (path: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + path, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export const Info = async () => {
  const {
    dependencies: {
      database: { max_connections, opened_connections, version }
    },
    updated_at
  } = (await fetchApi('/api/v1/status')) as TStatusBody

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
