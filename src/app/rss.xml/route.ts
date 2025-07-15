import RSS from 'rss'

import { getArticles } from '../articles/getArticles'

export async function GET() {
  const articles = await getArticles()

  const feed = new RSS({
    title: 'Jaehun',
    site_url: `${process.env.NEXT_PUBLIC_URL}`,
    feed_url: `${process.env.NEXT_PUBLIC_URL}/rss.xml`,
    image_url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent('jaehun dev')}`,
    language: 'ko',
    description: "Jaehun's personal blog",
  })

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      date: new Date(article.createdAt),
      author: 'Bang, Jaehun',
      url: `${process.env.NEXT_PUBLIC_URL}/articles/${article.id}`,
      guid: `${process.env.NEXT_PUBLIC_URL}/articles/${article.id}`,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
