'use client'

import { Article } from './Article'
import { Article as ArticleModel } from '~/entities/article/model'

type Props = {
  articles: ArticleModel[]
}

export const ArticleList = ({ articles }: Props) => {
  if (!articles?.length) {
    return null
  }

  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.id}>
            <Article {...article} />
          </li>
        )
      })}
    </ul>
  )
}
