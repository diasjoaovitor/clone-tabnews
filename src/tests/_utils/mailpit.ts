import type { APIRequestContext } from '@playwright/test'

// Same host as `baseURL`: Playwright doesn't load `.env.development`
const mailpitUrl = 'http://localhost:8025'

export const getActivationUrl = async (
  request: APIRequestContext,
  email: string
): Promise<string | undefined> => {
  // Searched by recipient, since other tests may send emails at the same time
  const search = await request.get(`${mailpitUrl}/api/v1/search`, {
    params: { query: `to:${email}` }
  })
  const { messages } = (await search.json()) as { messages: { ID: string }[] }
  const message = await request.get(
    `${mailpitUrl}/api/v1/message/${messages[0].ID}`
  )
  const { Text } = (await message.json()) as { Text: string }
  return Text.match(/https?:\/\/\S+\/cadastro\/ativar\/\S+/)?.[0]
}
