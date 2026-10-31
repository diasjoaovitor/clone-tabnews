import { expect, test } from '@playwright/test'

import { getActivationUrl } from '@/tests/_utils/mailpit'

test('activates the account from the email link', async ({ page, request }) => {
  // Its own prefix: the other specs run in other workers and may sign up in the same millisecond
  const username = `activation${Date.now()}`
  const email = `${username}@curso.dev`

  await page.goto('/cadastro')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Senha', { exact: true }).fill('senha123')
  await page.getByLabel('Confirmação de senha').fill('senha123')
  await page.getByRole('button', { name: 'Criar conta' }).click()
  await expect(page).toHaveURL('/cadastro/confirmar')

  const activationUrl = await getActivationUrl(request, email)
  expect(activationUrl).toBeDefined()

  await page.goto(activationUrl!)
  await page.getByRole('button', { name: 'Ativar conta' }).click()

  await expect(page.getByText('Sua conta foi ativada.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Entrar' })).toHaveAttribute(
    'href',
    '/login'
  )
})
