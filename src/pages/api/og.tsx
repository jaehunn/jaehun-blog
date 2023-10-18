import { NextRequest, ImageResponse } from 'next/server';
import styles from './og.module.scss';

const font = fetch(new URL('@/fonts/OpenSans-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer());

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Jaehun Dev';
  const createdAt = searchParams.get('createdAt');

  const fontData = await font;

  /** TODO: */
  /** @see https://nextjs.org/docs/app/api-reference/functions/image-response */
  return new ImageResponse(
    (
      <div className={styles['wrapper']}>
        <div>
          <span>jaehun.dev</span>

          {createdAt && <div>{createdAt}</div>}
        </div>

        <div>
          <div>{title}</div>
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
    },
  );
};

export default handler;
