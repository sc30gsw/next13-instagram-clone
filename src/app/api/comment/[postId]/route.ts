import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/libs/prismadb'

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } },
) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (typeof params.postId !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    if (!params.postId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })

    const comments = await prismadb.comment.findMany({
      where: {
        postId: params.postId,
      },
      include: { user: true, post: true },
      orderBy: [{ updatedAt: 'desc' }],
    })

    const commentCount = await prismadb.comment.count({
      where: {
        postId: params.postId,
      },
    })

    return NextResponse.json({ comments, commentCount }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
