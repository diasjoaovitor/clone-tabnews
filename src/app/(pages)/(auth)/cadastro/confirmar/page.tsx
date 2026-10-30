import type { Metadata } from 'next'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/components/ui/shadcn/card'

export const metadata: Metadata = { title: 'Confira seu email' }

const ConfirmSignUpPage = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">
        <h1>Confira seu email</h1>
      </CardTitle>
      <CardDescription>
        Enviamos um link de ativação para o email que você cadastrou. Clique
        nele para ativar sua conta.
      </CardDescription>
    </CardHeader>
  </Card>
)

export default ConfirmSignUpPage
