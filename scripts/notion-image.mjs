import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

import { notionToMarkdown, getPages } from './notion-client.mjs'
import { getHashedFilename } from './utils.mjs'

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
            const hashedFilename = getHashedFilename(node.url)

            // create directory in public folder
            const dir = `${process.cwd()}/public/images/${pageId}`
            mkdirSync(dir, { recursive: true })

            // save image as webp
            const savePath = join(dir, hashedFilename)

            // Skip if file already exists
            if (existsSync(savePath)) {
              console.log(`⏭️  Skipped (already exists): ${hashedFilename}`)

              return
            }

            saveImageAsWebp(node.url, savePath)
          }
        })
      }
    }
  }

  const markdown = notionToMarkdown.toMarkdownString(markdownBlocks)

  return markdown
}

const saveImageAsWebp = async (url, path) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Convert to webp using sharp
    await sharp(buffer).webp({ quality: 80 }).toFile(path)

    console.log(`✓ Saved: ${path}`)
  } catch (err) {
    console.error(`✗ Error saving ${url}:`, err.message)
  }
}

async function main() {
  const pages = await getPages()

  for (const page of pages) {
    const markdown = await getMarkdownByPage(page.id)

    console.log(markdown)
  }
}

main()
