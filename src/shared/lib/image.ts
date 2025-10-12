import { basename } from 'node:path'
import { hashWithMd5 } from './hash'

export const getHashedFilename = (url: string) => {
  const filename = basename(new URL(url).pathname)
  const hashedFilename = hashWithMd5(filename).slice(0, 16) + '.webp'

  return hashedFilename
}

export const getImagePublicUrl = (pageId: string, imageUrl: string) => {
  const hashedFilename = getHashedFilename(imageUrl)
  return `/images/${pageId}/${hashedFilename}`
}
