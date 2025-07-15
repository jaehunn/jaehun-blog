'use client'

import { Article, ArticleType } from './Article'

type Props = {
  articles: ArticleType[]
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
