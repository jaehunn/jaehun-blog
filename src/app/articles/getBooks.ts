import { getGitBooks } from '~/api/git-book/get-git-books.api'
import { ArticleType } from './Article'

export const getBooks = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gitBooks = (await getGitBooks()) as any[]

  const publicGitBooks = gitBooks.filter((book) => book.visibility === 'public')

  const books: ArticleType[] = publicGitBooks.map((book) => {
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
