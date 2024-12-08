import { ArticleList } from './ArticleList'
import { getArticles } from '~/entities/article/api'

export const ArticleListRSC = async () => {
  const articles = await getArticles()

  return <ArticleList articles={articles} />
}
