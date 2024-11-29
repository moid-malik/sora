import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  
  cookieStore.delete('user')

  return new NextResponse(
    JSON.stringify({
      message: 'Logged out successfully'
    }),
    {
      status: 200,
      headers: {
        'Set-Cookie': 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  )
}
