'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      {/* Profile Section */}
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div variants={fadeInUp}>
          <Image
            src="/images/profile.webp"
            alt="방재훈"
            className="rounded-full object-cover mx-auto"
            width={180}
            height={180}
          />
        </motion.div>

        <motion.div className="space-y-4" variants={fadeInUp}>
          <h1 className="text-4xl font-bold tracking-tight">방재훈</h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            {'안녕하세요,'}
            <br />
            {'프론트엔드 개발자 방재훈입니다.'}
            {''}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
