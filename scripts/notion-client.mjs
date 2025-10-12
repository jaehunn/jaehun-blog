import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import dotenv from 'dotenv'
import { join } from 'node:path'

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') })

export const notionClient = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const notionToMarkdown = new NotionToMarkdown({ notionClient })

export const getPages = async () => {
  const database = await notionClient.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_POSTS_DATABASE_ID,
  })

  return database.results
}
