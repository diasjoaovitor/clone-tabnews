import { NextResponse } from 'next/server'
import { database } from '@/infra/database'

export const GET = async () => {
  const result = await database.query('SELECT 1 + 1;')
  return NextResponse.json(
    { message: result },
    {
      status: 200
    }
  )
}
