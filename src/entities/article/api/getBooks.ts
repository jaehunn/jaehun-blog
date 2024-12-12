import { Article } from '~/entities/article'
import { getGitBooks } from '~/shared/lib/gitBook/getGitBooks'

export const getBooks = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gitBooks = (await getGitBooks()) as any[]

  const publicGitBooks = gitBooks.filter((book) => book.visibility === 'public')

  const books: Article[] = publicGitBooks.map((book) => {
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
