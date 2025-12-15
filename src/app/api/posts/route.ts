import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '~/entities/post/api/get-posts'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '9')

    // Get all posts
    const allPosts = await getPosts()

    if (!allPosts) {
      return NextResponse.json({ posts: [], total: 0, page, pageSize, totalPages: 0 })
    }

    // Calculate pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPosts = allPosts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(allPosts.length / pageSize)

    return NextResponse.json({
      posts: paginatedPosts,
      total: allPosts.length,
      page,
      pageSize,
      totalPages,
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
