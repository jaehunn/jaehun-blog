import { MetadataRoute } from 'next'

import { getArticles } from './articles/getArticles'

/** @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()

  const routes = ['', 'articles'].map((route) => ({
    url: `https://jaehun.dev/${route}`,
    lastModified: new Date().toISOString(),
  }))

  const posts =
    articles.map((article) => {
      return {
        url: `https://jaehun.dev/articles/${article.id}`,
        lastModified: new Date(article.updatedAt).toISOString(),
      }
    }) ?? []

  return [...routes, ...posts]
}
