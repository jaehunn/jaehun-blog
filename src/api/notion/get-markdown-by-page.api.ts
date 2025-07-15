import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { map } from 'unist-util-map'
import { basename, extname } from 'node:path'

import { notionToMarkdown } from './notion-client'
import { createHash } from 'node:crypto'

export const getMarkdownByPage = async (pageId: string) => {
  const markdownBlocks = await notionToMarkdown.pageToMarkdown(pageId)

  const imgBlocks = markdownBlocks.filter((block) => block.type === 'image')

  if (imgBlocks.length > 0) {
    for (const imgBlock of imgBlocks) {
      if (Boolean(imgBlock?.parent)) {
        const ast = unified().use(remarkParse).parse(imgBlock.parent)

        const updatedAst = map(ast, (node) => {
          if (node.type === 'image' && node.url) {
            const filename = basename(new URL(node.url).pathname)
            const hashedFilename = hashWithMd5(filename).slice(0, 16) + extname(filename)

            return {
              ...node,
              url: `${process.env.NEXT_PUBLIC_AWS_CF_URL}/${pageId}/${hashedFilename}`,
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

const hashWithMd5 = (input: string) => {
  const hash = createHash('md5')
  hash.update(input)

  return hash.digest('hex')
}
