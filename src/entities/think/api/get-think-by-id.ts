import { notionClient } from '~/shared/api/notion/notion-client'
import { getMarkdownByPage } from '~/shared/api/notion/get-markdown-by-page.api'

export const getThinkById = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = (await notionClient.pages.retrieve({ page_id: id })) as any
  const markdown = await getMarkdownByPage(id)

  const { created_time: createdAt, last_edited_time: updatedAt } = page
  const { title: titleProperties } = page.properties

  const [{ plain_text: title }] = titleProperties.title

  return {
    type: 'post' as const,
    id,
    title,
    description: '',
    createdAt,
    updatedAt,
    body: `${markdown.parent}`,
    url: `/thinks/${id}`,
  }
}
