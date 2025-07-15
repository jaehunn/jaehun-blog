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

    // AWS
    // CloudFront
    NEXT_PUBLIC_AWS_CF_URL: string

    // S3
    AWS_S3_REGION: string
    AWS_S3_BUCKET_NAME: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}
