import { render, screen } from '@testing-library/react'

import Home from '@/app/(pages)/page'

describe('<Home />', () => {
  test('should render the heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Marcelly é linda ❤', level: 1 })
    ).toBeInTheDocument()
  })
})
