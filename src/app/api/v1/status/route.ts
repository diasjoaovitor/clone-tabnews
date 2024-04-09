import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json(
    { message: 'Esta é uma mensagem de resposta' },
    {
      status: 200
    }
  )
}
