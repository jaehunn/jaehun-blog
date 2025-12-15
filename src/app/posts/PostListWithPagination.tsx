'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Post, PostType } from '~/entities/post/ui/Post'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'

type Props = {
  posts: PostType[]
  pageSize?: number
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

export const PostListWithPagination = ({ posts, pageSize = 9 }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  if (!posts?.length) {
    return null
  }

  const totalPages = Math.ceil(posts.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={currentPage === 1} onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink isActive={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentPage}
      >
        {currentPosts.map((post) => {
          return (
            <motion.div key={post.id} variants={itemVariants}>
              <Post {...post} />
            </motion.div>
          )
        })}
      </motion.div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
