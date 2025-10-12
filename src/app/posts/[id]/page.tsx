import { Metadata } from 'next'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import { getPostById } from '~/entities/post/api/get-post-by-id'
import { getPosts } from '~/entities/post/api/get-posts'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById((await params).id)

  if (post == null) {
    return {
      // ...
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://jaehun.dev/posts/${(await params).id}`,
      images: [
        {
          url: `https://jaehun.dev/default-image.jpg`,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts?.map(({ id }) => ({ id })) ?? []
}

export default async function PostPage({ params }: Props) {
  const post = await getPostById((await params).id)

  if (post?.body == null) {
    return null
  }

  const contentHtml = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(post.body)

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: contentHtml.value,
      }}
    />
  )
}
