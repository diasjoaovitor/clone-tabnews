import { expect, test } from '@playwright/test'

import { getActivationUrl } from '@/tests/_utils/mailpit'

test('signs in and lands on the home page', async ({ page, request }) => {
  // Its own prefix: the other specs run in other workers and may sign up in the same millisecond
  const username = `login${Date.now()}`
  const email = `${username}@curso.dev`
  const password = 'senha123'

  await request.post('/api/v1/users', { data: { username, email, password } })
  const activationUrl = await getActivationUrl(request, email)
  const tokenId = activationUrl!.split('/').at(-1)
  await request.patch(`/api/v1/activations/${tokenId}`)

  await page.goto('/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Senha').fill(password)
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL('/')
  const cookies = await page.context().cookies()
  expect(cookies.some((cookie) => cookie.name === 'session_id')).toBe(true)
})

test('shows an error for invalid credentials', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill(`unknown${Date.now()}@curso.dev`)
  await page.getByLabel('Senha').fill('senha123')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(
    page.getByText('Dados de autenticação não conferem.')
  ).toBeVisible()
  await expect(page).toHaveURL('/login')
})
