import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import { createWriteStream, mkdirSync } from 'node:fs'
import { join, basename, extname } from 'node:path'

import { createHash } from 'node:crypto'

import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import dotenv from 'dotenv'

dotenv.config({ path: join(process.cwd(), '.env.local') })

export const notionClient = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const notionToMarkdown = new NotionToMarkdown({ notionClient })

const getMarkdownByPage = async (pageId) => {
  const markdownBlocks = await notionToMarkdown.pageToMarkdown(pageId)

  const imgBlocks = markdownBlocks.filter((block) => block.type === 'image')

  console.log(imgBlocks)

  if (imgBlocks.length > 0) {
    for (const imgBlock of imgBlocks) {
      if (Boolean(imgBlock?.parent)) {
        const ast = unified().use(remarkParse).parse(imgBlock.parent)

        visit(ast, 'image', (node) => {
          if (node.url) {
            const filename = basename(new URL(node.url).pathname)
            const hashedFilename = hashWithMd5(filename).slice(0, 16) + extname(filename)

            // create directory
            const dir = `${process.cwd()}/src/images/${pageId}`
            mkdirSync(dir, { recursive: true })

            // save image
            const savePath = join(dir, hashedFilename)
            saveImage(node.url, savePath)
          }
        })
      }
    }
  }

  const markdown = notionToMarkdown.toMarkdownString(markdownBlocks)

  return markdown
}

const saveImage = async (url, path) => {
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

const downloadImage = async (url) => {
  try {
    const response = await fetch(url)

    return response
  } catch (err) {
    console.error(err)
  }
}

const hashWithMd5 = (input) => {
  const hash = createHash('md5')
  hash.update(input)

  return hash.digest('hex')
}

export const getPages = async () => {
  const database = await notionClient.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID })

  return database.results
}

async function main() {
  const pages = await getPages()

  for (const page of pages) {
    const markdown = await getMarkdownByPage(page.id)

    console.log(markdown)
  }
}

main()
