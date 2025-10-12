import { Metadata } from 'next'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import { getThinkById } from '~/entities/think/api/get-think-by-id'
import { getThinks } from '~/entities/think/api/get-thinks'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const think = await getThinkById((await params).id)

  if (think == null) {
    return {
      // ...
    }
  }

  return {
    title: think.title,
    description: think.description,
    openGraph: {
      title: think.title,
      description: think.description,
      url: `https://jaehun.dev/thinks/${(await params).id}`,
      images: [
        {
          url: `https://jaehun.dev/default-image.jpg`,
          width: 1200,
          height: 600,
          alt: think.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const thinks = await getThinks()

  return thinks?.map(({ id }) => ({ id })) ?? []
}

export default async function ThinkPage({ params }: Props) {
  const think = await getThinkById((await params).id)

  if (think?.body == null) {
    return null
  }

  const contentHtml = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(think.body)

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: contentHtml.value,
      }}
    />
  )
}
