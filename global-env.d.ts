declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: string
    NEXT_PUBLIC_GITBOOK_URL: string
    NEXT_PUBLIC_GITBOOK_API_URL: string

    // Private
    // Notion
    NEXT_PUBLIC_NOTION_API_KEY: string
    NEXT_PUBLIC_NOTION_DATABASE_ID: string

    // Gitbook
    NEXT_PUBLIC_GITBOOK_ACCESS_TOKEN: string
  }
}
