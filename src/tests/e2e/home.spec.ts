import { expect, test } from '@playwright/test'

test('renders the heading', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Marcelly é linda ❤', level: 1 })
  ).toBeVisible()
})
