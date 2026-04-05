import { email } from '@/infra'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
})

beforeEach(async () => {
  await orchestrator.deleteAllEmails()
})

describe('infra/email.ts', () => {
  test('send()', async () => {
    await email.send({
      from: {
        name: 'Clone TabNews',
        address: 'contato@diasjoaovitor.com.br'
      },
      to: 'contato@curso.dev',
      subject: 'Teste de assunto',
      text: 'Teste de corpo.'
    })

    await email.send({
      from: {
        name: 'Clone TabNews',
        address: 'contato@diasjoaovitor.com.br'
      },
      to: 'contato@curso.dev',
      subject: 'Último email enviado',
      text: 'Corpo do último email.'
    })

    const lastEmail = await orchestrator.getLastEmail()
    expect(lastEmail.sender).toBe('<contato@diasjoaovitor.com.br>')
    expect(lastEmail.recipients[0]).toBe('<contato@curso.dev>')
    expect(lastEmail.subject).toBe('Último email enviado')
    expect(lastEmail.text).toBe('Corpo do último email.\r\n')
  })
})
