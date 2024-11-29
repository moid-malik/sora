import { ImageResponse } from 'next/og'
import { headers } from 'next/headers'

export const runtime = 'edge'
export const contentType = 'image/svg+xml'
export const size = {
  width: 32,
  height: 32,
}

export default async function GET() {
  const headersList = headers()
  const isDarkMode = headersList.get('Sec-CH-Prefers-Color-Scheme') === 'dark'
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          background: isDarkMode ? 'white' : 'black',
          borderRadius: '50%'
        }}
      >
        <div style={{
          color: isDarkMode ? 'black' : 'white',
          fontFamily: 'Arial',
          fontWeight: 'bold'
        }}>
          S
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
