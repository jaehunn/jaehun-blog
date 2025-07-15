import { NextApiRequest } from 'next'
import { ImageResponse } from 'next/og'

/** @see https://nextjs.org/docs/app/building-your-application/routing/route-handlers#edge-and-nodejs-runtimes */
export const runtime = 'edge'

const font = fetch(new URL('~/fonts/NanumSquareNeo-Variable.woff2', import.meta.url)).then((res) => res.arrayBuffer())

/** @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes */
const handler = async (req: NextApiRequest) => {
  const { searchParams } = new URL(`${req?.url}`, process.env.NEXT_PUBLIC_HOST)
  const title = searchParams.get('title')

  const fontData = await font

  if (!title) {
    return new Response('Missing title.', { status: 400 })
  }

  /** @see https://nextjs.org/docs/app/api-reference/functions/image-response */
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100% ',
          backgroundColor: '#e6edf3',
          color: '#1F2328',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '5rem',
          }}
        >
          {title.toLocaleUpperCase()}
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'OpenSans',
          data: fontData,
          weight: 500,
        },
      ],
      width: 1200,
      height: 600,
    }
  )
}

export default handler
