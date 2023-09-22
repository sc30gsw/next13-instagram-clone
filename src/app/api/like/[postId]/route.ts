import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/libs/prismadb'

// いいね数取得API
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

    const likeCount = await prismadb.like.count({
      where: {
        postId: params.postId,
      },
    })

    return NextResponse.json({ likeCount }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
