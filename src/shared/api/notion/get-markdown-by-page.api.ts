import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { map } from 'unist-util-map'

import { notionToMarkdown } from './notion-client'
import { getImagePublicUrl } from '~/shared/lib/image'

export const getMarkdownByPage = async (pageId: string) => {
  const markdownBlocks = await notionToMarkdown.pageToMarkdown(pageId)

  const imgBlocks = markdownBlocks.filter((block) => block.type === 'image')

  if (imgBlocks.length > 0) {
    for (const imgBlock of imgBlocks) {
      if (Boolean(imgBlock?.parent)) {
        const ast = unified().use(remarkParse).parse(imgBlock.parent)

        const updatedAst = map(ast, (node) => {
          if (node.type === 'image' && node.url) {
            return {
              ...node,
              url: getImagePublicUrl(pageId, node.url),
            }
          }

          return node
        })

        // Serialize the updated AST back into a string if necessary
        const updatedContent = unified()
          .use(remarkStringify)
          .stringify(updatedAst as any)

        // Use the updated content (e.g., replace imgBlock.parent)
        imgBlock.parent = updatedContent
      }
    }
  }

  const markdown = notionToMarkdown.toMarkdownString(markdownBlocks)

  return markdown
}
