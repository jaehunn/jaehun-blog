import { createHash } from 'node:crypto'

export const hashWithMd5 = (input: string) => {
  const hash = createHash('md5')
  hash.update(input)

  return hash.digest('hex')
}
