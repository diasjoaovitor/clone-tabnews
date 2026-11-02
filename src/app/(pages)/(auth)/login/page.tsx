import type { Metadata } from 'next'
import Link from 'next/link'

import { FormCard } from '@/app/components/ui/custom/form-card'

import { SignInForm } from './_components/sign-in-form'

export const metadata: Metadata = { title: 'Login' }

const SignInPage = () => (
  <FormCard
    title="Login"
    description="Entre na sua conta no Clone TabNews."
    footer={
      <p>
        Não tem uma conta?{' '}
        <Link href="/cadastro" className="underline underline-offset-4">
          Criar conta
        </Link>
      </p>
    }
  >
    <SignInForm />
  </FormCard>
)

export default SignInPage
