import { Suspense } from 'react'

import PostListRSC from './PostListRSC'

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
