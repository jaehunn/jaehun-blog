import { getMarkdownByPage, getPages } from '~/shared/lib/notion'
import { Article } from '../model'

export const getArticles = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = (await getPages()) as any[]
  const markdowns = await Promise.all(pages.map((page) => getMarkdownByPage(page.id)))

  const articles: Article[] = pages.map((page, index) => {
    const { id, created_time: createdAt, last_edited_time: updatedAt } = page
    const { title: titleProperties, description: descriptionProperties } = page.properties

    const [{ plain_text: title }] = titleProperties.title
    const [{ plain_text: description }] = descriptionProperties['rich_text']

    return {
      id,
      title,
      description,
      createdAt,
      updatedAt,
      body: `${markdowns[index].parent}`,
    }
  })

  return articles
}
