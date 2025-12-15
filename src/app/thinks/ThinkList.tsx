'use client'

import { motion } from 'motion/react'
import { Post, PostType } from '~/entities/post/ui/Post'

type Props = {
  thinks: PostType[]
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

export const ThinkList = ({ thinks }: Props) => {
  if (!thinks?.length) {
    return null
  }

  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {thinks.map((think) => {
        return (
          <motion.li key={think.id} variants={itemVariants}>
            <Post {...think} />
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
