import { expect, test } from '@playwright/test'

test('signs up and lands on the confirmation page', async ({ page }) => {
  const username = `user${Date.now()}`

  await page.goto('/cadastro')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Email').fill(`${username}@curso.dev`)
  await page.getByLabel('Senha', { exact: true }).fill('senha123')
  await page.getByLabel('Confirmação de senha').fill('senha123')
  await page.getByRole('button', { name: 'Criar conta' }).click()

  await expect(page).toHaveURL('/cadastro/confirmar')
  await expect(
    page.getByRole('heading', { name: 'Confira seu email', level: 1 })
  ).toBeVisible()
})
