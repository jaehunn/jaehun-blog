import RSS from 'rss'

import { getPosts } from '~/entities/post/api/get-posts'

export async function GET() {
  const posts = await getPosts()

  const feed = new RSS({
    title: 'Jaehun',
    site_url: `${process.env.NEXT_PUBLIC_URL}`,
    feed_url: `${process.env.NEXT_PUBLIC_URL}/rss.xml`,
    image_url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent('jaehun dev')}`,
    language: 'ko',
    description: "Jaehun's personal blog",
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      date: new Date(post.createdAt),
      author: 'Bang, Jaehun',
      url: `${process.env.NEXT_PUBLIC_URL}/posts/${post.id}`,
      guid: `${process.env.NEXT_PUBLIC_URL}/posts/${post.id}`,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
