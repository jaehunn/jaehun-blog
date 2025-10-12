import { sortBy } from 'lodash-es'

import { ThinkList } from './ThinkList'
import { getThinks } from '~/entities/think/api/get-thinks'

export const ThinkListServer = async () => {
  const thinks = await getThinks()

  const sortedThinks = sortBy(thinks, 'createdAt').reverse()

  return <ThinkList thinks={sortedThinks} />
}
