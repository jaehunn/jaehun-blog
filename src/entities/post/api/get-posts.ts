import { getPages } from '~/shared/api/notion/get-pages.api'
import { PostType } from '../ui/Post'
import { getMarkdownByPage } from '~/shared/api/notion/get-markdown-by-page.api'

export const getPosts = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = (await getPages()) as any[]
  const markdowns = await Promise.all(pages.map((page) => getMarkdownByPage(page.id)))

  const posts: PostType[] = pages.map((page, index) => {
    const { id, created_time: createdAt, last_edited_time: updatedAt, cover } = page
    const { title: titleProperties } = page.properties

    const [{ plain_text: title }] = titleProperties.title
    // const [{ plain_text: description }] = descriptionProperties['rich_text']

    // Extract thumbnail from cover image
    let thumbnail: string | undefined
    if (cover) {
      if (cover.type === 'external') {
        thumbnail = cover.external.url
      } else if (cover.type === 'file') {
        thumbnail = cover.file.url
      }
    }

    return {
      type: 'post',
      id,
      title,
      description: '',
      createdAt,
      updatedAt,
      body: `${markdowns[index].parent}`,
      url: `/posts/${id}`,
      thumbnail,
    }
  })

  return posts
}
