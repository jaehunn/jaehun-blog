declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: string

    // Private
    NEXT_PUBLIC_NOTION_API_KEY: string
    NEXT_PUBLIC_NOTION_DATABASE_ID: string
  }
}
