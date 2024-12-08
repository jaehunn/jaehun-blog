import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export const notionClient = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const notionToMarkdown = new NotionToMarkdown({ notionClient })
