import { TStatusDto } from '@/dtos'

import { getStatus } from './actions'

type TStatusKey = keyof TStatusDto['dependencies']['database']

type TStatusHtml = Record<
  TStatusKey,
  { label: string; value: string | number | undefined }
>

export const Info = async () => {
  const {
    dependencies: { database },
    updated_at
  } = await getStatus()

  const status: TStatusHtml = {
    version: {
      label: 'Versão',
      value: database.version
    },
    opened_connections: {
      label: 'Conexões abertas',
      value: database.opened_connections
    },
    max_connections: {
      label: 'Conexões máximas',
      value: database.max_connections
    }
  }

  const databaseKeys = Object.keys(database) as TStatusKey[]

  return (
    <>
      <p>Última atualização: {updated_at.toISOString()}</p>
      <p>Banco de Dados</p>
      <ul>
        {databaseKeys.map((key) => (
          <li key={key}>
            {status[key].label}: {status[key].value}
          </li>
        ))}
      </ul>
    </>
  )
}
