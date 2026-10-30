import { getStatus } from '@/app/(pages)/(public)/status/_components/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/components/ui/shadcn/card'
import { StatusDto } from '@/dtos/status-dto'

type StatusKey = keyof StatusDto['dependencies']['database']

type DatabaseRows = Record<
  StatusKey,
  { label: string; value: string | number | undefined }
>

// Rendered on the server, whose time zone is UTC on Vercel
const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'long',
  timeZone: 'America/Sao_Paulo'
})

export const DatabaseStatus = async () => {
  const {
    dependencies: { database },
    updated_at
  } = await getStatus()

  const status: DatabaseRows = {
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

  const databaseKeys = Object.keys(database) as StatusKey[]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Banco de dados</h2>
        </CardTitle>
        <CardDescription>
          Última atualização:{' '}
          <time dateTime={updated_at.toISOString()}>
            {dateTimeFormat.format(updated_at)}
          </time>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="divide-y">
          {databaseKeys.map((key) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0"
            >
              <dt className="text-muted-foreground">{status[key].label}</dt>
              <dd className="font-mono">{status[key].value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
