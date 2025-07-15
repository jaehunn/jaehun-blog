import { Metadata } from 'next'
import { Box } from '@radix-ui/themes'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import { getArticleById } from '../getArticleById'
import { getArticles } from '../getArticles'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleById((await params).id)

  if (article == null) {
    return {
      // ...
    }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://jaehun.dev/articles/${(await params).id}`,
      images: [
        {
          url: `https://jaehun.dev/default-image.jpg`,
          width: 1200,
          height: 600,
          alt: article.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()

  return articles?.map(({ id }) => ({ id })) ?? []
}

export default async function PostPage({ params }: Props) {
  const article = await getArticleById((await params).id)

  if (article?.body == null) {
    return null
  }

  const contentHtml = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(article.body)

  return (
    <Box
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: contentHtml.value,
      }}
    />
  )
}
