import { notionClient } from './notion-client'

export const getThinks = async () => {
  const database = await notionClient.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_THINKS_DATABASE_ID,
  })

  return database.results
}
