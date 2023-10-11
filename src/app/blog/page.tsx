import { Suspense } from 'react';

import PostListRSC from './PostListRSC';

export default function Blog() {
  return (
    <Suspense fallback={<></>}>
      <PostListRSC />
    </Suspense>
  );
}
