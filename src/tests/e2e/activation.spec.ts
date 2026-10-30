import { expect, test } from '@playwright/test'

// Same host as `baseURL`: Playwright doesn't load `.env.development`
const mailpitUrl = 'http://localhost:8025'

test('activates the account from the email link', async ({ page, request }) => {
  // Its own prefix: `sign-up.spec.ts` runs in another worker and may sign up in the same millisecond
  const username = `activation${Date.now()}`
  const email = `${username}@curso.dev`

  await page.goto('/cadastro')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Senha', { exact: true }).fill('senha123')
  await page.getByLabel('Confirmação de senha').fill('senha123')
  await page.getByRole('button', { name: 'Criar conta' }).click()
  await expect(page).toHaveURL('/cadastro/confirmar')

  // Searched by recipient, since other tests may send emails at the same time
  const search = await request.get(`${mailpitUrl}/api/v1/search`, {
    params: { query: `to:${email}` }
  })
  const { messages } = (await search.json()) as { messages: { ID: string }[] }
  const message = await request.get(
    `${mailpitUrl}/api/v1/message/${messages[0].ID}`
  )
  const { Text } = (await message.json()) as { Text: string }
  const activationUrl = Text.match(/https?:\/\/\S+\/cadastro\/ativar\/\S+/)?.[0]
  expect(activationUrl).toBeDefined()

  await page.goto(activationUrl!)
  await page.getByRole('button', { name: 'Ativar conta' }).click()

  await expect(page.getByText('Sua conta foi ativada.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Entrar' })).toHaveAttribute(
    'href',
    '/login'
  )
})
