import { expect, test } from '@playwright/test'

test('moves the focus to the first invalid field when a later one already shows an error', async ({
  page
}) => {
  await page.goto('/cadastro')
  const username = page.getByRole('textbox', { name: 'Username' })
  const email = page.getByRole('textbox', { name: 'Email' })

  await email.fill('x')
  await page.locator('body').click({ position: { x: 1, y: 1 } })
  await expect(email).toHaveAttribute('aria-invalid', 'true')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  await expect(username).toHaveAttribute('aria-invalid', 'true')
  await expect(username).toBeFocused()
})
