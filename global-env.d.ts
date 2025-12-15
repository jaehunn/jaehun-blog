declare namespace NodeJS {
  interface ProcessEnv {
    // Public URLs
    NEXT_PUBLIC_URL: string
    NEXT_PUBLIC_GITBOOK_URL: string
    NEXT_PUBLIC_GITBOOK_API_URL: string

    // Notion API
    NEXT_PUBLIC_NOTION_API_KEY: string
    NEXT_PUBLIC_NOTION_POSTS_DATABASE_ID: string

    // GitBook Access Token
    NEXT_PUBLIC_GITBOOK_ACCESS_TOKEN: string
  }
}
