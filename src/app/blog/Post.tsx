import Link from 'next/link';

import styles from './Post.module.scss';
import { Post as PostType } from '@/types/post';

type Props = PostType & {
  // ...
};

export default function Post({ slug, title, description, body, date }: Props) {
  return (
    <div className={styles['wrapper']}>
      <Link href={`/blog/${slug}`}>
        <h4 className={styles['title']}>{title}</h4>

        <div className={styles['date']}>
          {date && (
            <span>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(new Date(date))}
            </span>
          )}
        </div>

        <p className={styles['description']}>{description}</p>
      </Link>
    </div>
  );
}
