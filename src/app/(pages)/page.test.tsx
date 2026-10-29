import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Home from '@/app/(pages)/page'

describe('<Home />', () => {
  test('renders the heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Marcelly é linda ❤', level: 1 })
    ).toBeDefined()
  })
})
