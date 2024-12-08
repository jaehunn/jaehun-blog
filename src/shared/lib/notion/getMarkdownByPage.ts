import { notionToMarkdown } from './notion'

export const getMarkdownByPage = async (pageId: string) => {
  const markdownBlocks = await notionToMarkdown.pageToMarkdown(pageId)

  const markdown = notionToMarkdown.toMarkdownString(markdownBlocks)

  return markdown
}
