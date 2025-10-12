import { MetadataRoute } from 'next'

import { getPosts } from '~/entities/post/api/get-posts'

/** @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const routes = ['', 'posts'].map((route) => ({
    url: `https://jaehun.dev/${route}`,
    lastModified: new Date().toISOString(),
  }))

  const postsRoutes =
    posts.map((post) => {
      return {
        url: `https://jaehun.dev/posts/${post.id}`,
        lastModified: new Date(post.updatedAt).toISOString(),
      }
    }) ?? []

  return [...routes, ...postsRoutes]
}
