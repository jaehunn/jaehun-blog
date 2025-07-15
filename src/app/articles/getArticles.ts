import { getPages } from '~/api/notion/get-pages.api'
import { ArticleType } from './Article'
import { getMarkdownByPage } from '~/api/notion/get-markdown-by-page.api'

export const getArticles = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = (await getPages()) as any[]
  const markdowns = await Promise.all(pages.map((page) => getMarkdownByPage(page.id)))

  const articles: ArticleType[] = pages.map((page, index) => {
    const { id, created_time: createdAt, last_edited_time: updatedAt } = page
    const { title: titleProperties, description: descriptionProperties } = page.properties

    const [{ plain_text: title }] = titleProperties.title
    const [{ plain_text: description }] = descriptionProperties['rich_text']

    return {
      type: 'article',
      id,
      title,
      description,
      createdAt,
      updatedAt,
      body: `${markdowns[index].parent}`,
      url: `/articles/${id}`,
    }
  })

  return articles
}
