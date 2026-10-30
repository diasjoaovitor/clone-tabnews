import type { Metadata } from 'next'
import Link from 'next/link'

import { SignUpForm } from '@/app/(pages)/(auth)/cadastro/_components/sign-up-form'
import { FormCard } from '@/app/components/ui/custom/form-card'

export const metadata: Metadata = { title: 'Cadastro' }

const SignUpPage = () => (
  <FormCard
    title="Cadastro"
    description="Crie sua conta no Clone TabNews."
    footer={
      <p>
        Já tem uma conta?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Entrar
        </Link>
      </p>
    }
  >
    <SignUpForm />
  </FormCard>
)

export default SignUpPage
