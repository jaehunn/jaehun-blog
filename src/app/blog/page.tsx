import { Suspense } from 'react'

import PostListRSC from './PostListRSC'
import styles from './page.module.scss'

export default function Blog() {
  return (
    <div>
      <section>
        <Suspense fallback={<></>}>
          <PostListRSC />
        </Suspense>
      </section>
    </div>
  )
}
