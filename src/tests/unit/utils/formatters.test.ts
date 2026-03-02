import { formatUsername } from '@/utils'

describe('formatUsername', () => {
  it('should remove special characters', () => {
    expect(formatUsername('user.name_1')).toBe('username1')
    expect(formatUsername('joãovitor')).toBe('joaovitor')
    expect(formatUsername('àáâãäåçèéêëìíîïðñòóôõö÷øùúûüýþÿ')).toBe(
      'aaaaaaceeeeiiiinooooouuuuyy'
    )
    expect(formatUsername('!#$%&*()_+-=')).toBe('')
  })
})
