import type { Metadata } from 'next'

import { ActivationForm } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/_components/activation-form'
import { getActivationState } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/_components/data'
import { FormCard } from '@/app/components/ui/custom/form-card'

export const metadata: Metadata = { title: 'Ativar conta' }

const ActivationPage = async ({
  params
}: PageProps<'/cadastro/ativar/[token-id]'>) => {
  const { 'token-id': tokenId } = await params
  const initialState = await getActivationState(tokenId)

  return (
    <FormCard
      title="Ativar conta"
      description="Ative sua conta no Clone TabNews."
    >
      <ActivationForm tokenId={tokenId} initialState={initialState} />
    </FormCard>
  )
}

export default ActivationPage
