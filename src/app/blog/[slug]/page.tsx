import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import getContentBySlug from '~/utils/getContentBySlug'
import getAllContent from '~/utils/getAllContent'
import { Metadata } from 'next'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const contentData = await getContentBySlug(params.slug)

  return {
    title: contentData?.data?.title || 'Jaehun',
    description: contentData?.data?.description || "Jaehun's blog post",
    openGraph: {
      title: contentData?.data?.title || 'Jaehun',
      description: contentData?.data?.description || "Jaehun's blog post",
      url: `https://jaehun.dev/posts/${params.slug}`,
      images: [
        {
          url:
            contentData?.data?.image || `https://jaehun.dev/default-image.jpg`,
          width: 1200,
          height: 600,
          alt: contentData?.data?.title || "Jaehun's blog post",
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const allContent = await getAllContent()

  return allContent?.map(({ data }) => ({ slug: data?.slug })) ?? []
}

export default async function PostPage({ params }: Props) {
  const contentData = await getContentBySlug(params.slug)

  if (!contentData?.content) {
    return <div></div>
  }

  const contentHtml = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(contentData.content)

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: contentHtml.value,
      }}
    />
  )
}
