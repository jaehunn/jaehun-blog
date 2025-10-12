import { getThinks as getNotionThinks } from '~/shared/api/notion/get-thinks.api'
import { getMarkdownByPage } from '~/shared/api/notion/get-markdown-by-page.api'
import { PostType } from '~/entities/post/ui/Post'

export const getThinks = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = (await getNotionThinks()) as any[]
  const markdowns = await Promise.all(pages.map((page) => getMarkdownByPage(page.id)))

  const thinks: PostType[] = pages.map((page, index) => {
    const { id, created_time: createdAt, last_edited_time: updatedAt } = page
    const { title: titleProperties } = page.properties

    const [{ plain_text: title }] = titleProperties.title

    return {
      type: 'post',
      id,
      title,
      description: '',
      createdAt,
      updatedAt,
      body: `${markdowns[index].parent}`,
      url: `/thinks/${id}`,
    }
  })

  return thinks
}
