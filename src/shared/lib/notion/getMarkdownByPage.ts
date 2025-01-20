import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import { createWriteStream, mkdirSync } from 'node:fs'
import { join, basename, extname } from 'node:path'

import { notionToMarkdown } from './notion'
import { createHash } from 'node:crypto'

export const getMarkdownByPage = async (pageId: string) => {
  const markdownBlocks = await notionToMarkdown.pageToMarkdown(pageId)

  const imgBlocks = markdownBlocks.filter((block) => block.type === 'image')

  console.log({
    1: imgBlocks,
  })

  if (imgBlocks.length > 0) {
    for (const imgBlock of imgBlocks) {
      console.log({
        2: imgBlock,
      })
      if (Boolean(imgBlock?.parent)) {
        const ast = unified().use(remarkParse).parse(imgBlock.parent)

        console.log({
          2: ast,
        })

        visit(ast, 'image', (node) => {
          console.log({
            2: node,
          })
          if (node.url) {
            const filename = basename(new URL(node.url).pathname)
            const hashedFilename = hashWithMd5(filename).slice(0, 16) + extname(filename)

            // create directory
            const dir = `${process.cwd()}/src/shared/images/${pageId}`
            mkdirSync(dir, { recursive: true })

            // save image
            const savePath = join(dir, hashedFilename)
            saveImage(node.url, savePath)

            // update img block url
            node.url = `${process.env.NEXT_PUBLIC_AWS_CF_URL}/${pageId}/${hashedFilename}`
          }
        })
      }
    }
  }

  const markdown = notionToMarkdown.toMarkdownString(markdownBlocks)

  return markdown
}

const saveImage = async (url: string, path: string) => {
  try {
    const response = await downloadImage(url)

    if (response?.body == null) {
      throw new Error('response.body is null')
    }

    const fileStream = createWriteStream(path)
    const reader = response.body.getReader()

    while (true) {
      const { value, done } = await reader.read()

      if (value) {
        fileStream.write(Buffer.from(value))
      }

      if (done) {
        break
      }
    }

    fileStream.end()
  } catch (err) {
    console.error(err)
  }
}

const downloadImage = async (url: string) => {
  try {
    const response = await fetch(url)

    return response
  } catch (err) {
    console.error(err)
  }
}

const hashWithMd5 = (input: string) => {
  const hash = createHash('md5')
  hash.update(input)

  return hash.digest('hex')
}
