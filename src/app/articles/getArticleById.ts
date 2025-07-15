import { getArticles } from './getArticles'

export const getArticleById = async (id: string) => {
  const articles = await getArticles()

  const article = articles.find((article) => article.id === id)

  if (article == null) {
    return null
  }

  return article
}
