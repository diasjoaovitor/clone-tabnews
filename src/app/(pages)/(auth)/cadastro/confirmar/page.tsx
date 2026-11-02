import type { Metadata } from 'next'

import { FormCard } from '@/app/components/ui/custom/form-card'

export const metadata: Metadata = { title: 'Confira seu email' }

const ConfirmSignUpPage = () => (
  <FormCard
    title="Confira seu email"
    description="Enviamos um link de ativação para o email que você cadastrou. Clique nele para ativar sua conta."
  />
)

export default ConfirmSignUpPage
