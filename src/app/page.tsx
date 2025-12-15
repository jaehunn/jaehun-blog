import Link from 'next/link'
import { ProfileSection } from './ProfileSection'
import { getPosts } from '~/entities/post/api/get-posts'
import { Post } from '~/entities/post/ui/Post'

export default async function Home() {
  const allPosts = await getPosts()
  const latestPosts = allPosts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-12">
      <ProfileSection />

      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">최신 포스트</h2>
          <Link href="/posts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            전체보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
