import { createHash } from 'node:crypto'
import { basename } from 'node:path'

export const hashWithMd5 = (input) => {
  const hash = createHash('md5')
  hash.update(input)

  return hash.digest('hex')
}

export const getHashedFilename = (url) => {
  const filename = basename(new URL(url).pathname)

  return hashWithMd5(filename).slice(0, 16) + '.webp'
}
