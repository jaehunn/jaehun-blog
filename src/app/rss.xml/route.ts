import RSS from 'rss'

import getAllContent from '~/utils/getAllContent'
import { Post as PostType } from '~/types/post'

export async function GET() {
  const allContent = await getAllContent()

  const posts = (allContent ?? [])?.map(({ data, content }) => {
    return {
      ...data,
      body: content,
    }
  }) as PostType[]

  /** Ascending */
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const feed = new RSS({
    title: 'Jaehun',
    site_url: `${process.env.NEXT_PUBLIC_URL}`,
    feed_url: `${process.env.NEXT_PUBLIC_URL}/rss.xml`,
    image_url: `${
      process.env.NEXT_PUBLIC_URL
    }/api/og?title=${encodeURIComponent('JAEHUN DEV')}`,
    language: 'ko',
    description: "Jaehun's personal blog.",
  })

  sortedPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      date: new Date(post.createdAt),
      author: 'Bang, Jaehun',
      url: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
      guid: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
