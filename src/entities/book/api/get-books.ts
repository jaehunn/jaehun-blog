import { getGitBooks } from '~/shared/api/gitbook/get-git-books.api'
import { PostType } from '~/entities/post/ui/Post'

export const getBooks = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gitBooks = (await getGitBooks()) as any[]

  const publicGitBooks = gitBooks.filter((book) => book.visibility === 'public')

  const books: PostType[] = publicGitBooks.map((book) => {
    const { id, title, createdAt, updatedAt, urls } = book

    return {
      type: 'book',
      id,
      title,
      description: title,
      createdAt,
      updatedAt,
      body: title,
      url: urls.public,
    }
  })

  return books
}
