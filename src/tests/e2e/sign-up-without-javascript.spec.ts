import { expect, test } from '@playwright/test'

test.use({ javaScriptEnabled: false })

test('signs up by posting straight to the Server Action', async ({ page }) => {
  // Its own prefix: the other specs run in other workers and may sign up in the same millisecond
  const username = `nojs${Date.now()}`

  await page.goto('/cadastro')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Email').fill(`${username}@curso.dev`)
  await page.getByLabel('Senha', { exact: true }).fill('senha123')
  await page.getByLabel('Confirmação de senha').fill('senha123')
  await page.getByRole('button', { name: 'Criar conta' }).click()

  await expect(page).toHaveURL('/cadastro/confirmar')
})

test('shows the server field errors and refills the fields except the passwords', async ({
  page
}) => {
  const username = `nojsinvalid${Date.now()}`
  const email = `${username}@curso.dev`

  await page.goto('/cadastro')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Senha', { exact: true }).fill('curta')
  await page.getByLabel('Confirmação de senha').fill('outra')
  await page.getByRole('button', { name: 'Criar conta' }).click()

  await expect(
    page.getByLabel('Confirmação de senha')
  ).toHaveAccessibleDescription('As senhas não coincidem.')
  await expect(
    page.getByLabel('Senha', { exact: true })
  ).toHaveAccessibleDescription(
    'Mínimo de 8 caracteres. A senha deve conter pelo menos 8 caracteres.'
  )
  await expect(page.getByLabel('Username')).toHaveValue(username)
  await expect(page.getByLabel('Email')).toHaveValue(email)
  await expect(page.getByLabel('Senha', { exact: true })).toHaveValue('')
  await expect(page.getByLabel('Confirmação de senha')).toHaveValue('')
  await expect(page).toHaveURL('/cadastro')
})
