'use client'

import { Post, PostType } from '~/entities/post/ui/Post'

type Props = {
  thinks: PostType[]
}

export const ThinkList = ({ thinks }: Props) => {
  if (!thinks?.length) {
    return null
  }

  return (
    <ul>
      {thinks.map((think) => {
        return (
          <li key={think.id}>
            <Post {...think} />
          </li>
        )
      })}
    </ul>
  )
}
