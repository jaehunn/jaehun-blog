'use client'

import { motion } from 'motion/react'
import { Post, PostType } from '~/entities/post/ui/Post'

type Props = {
  posts: PostType[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const PostList = ({ posts }: Props) => {
  if (!posts?.length) {
    return null
  }

  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {posts.map((post) => {
        return (
          <motion.li key={post.id} variants={itemVariants}>
            <Post {...post} />
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
