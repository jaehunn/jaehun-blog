import { sortBy } from 'lodash-es'

import { ArticleList } from './ArticleList'
import { getBooks } from './getBooks'
import { getArticles } from './getArticles'

export const ArticleListRSC = async () => {
  const articles = await getArticles()
  const books = await getBooks()

  const latestArticles = sortBy([...articles, ...books], 'createdAt').reverse()

  return <ArticleList articles={latestArticles} />
}
