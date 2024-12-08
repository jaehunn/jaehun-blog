import { notionClient } from './notion'

export const getPages = async () => {
  const database = await notionClient.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID })

  return database.results
}
