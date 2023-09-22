import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import options from '@/libs/options'
import prismadb from '@/libs/prismadb'

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const session = await getServerSession(options)

    if (!session)
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

    const user = await prismadb.user.findUnique({
      where: { email: session.user?.email as string },
    })

    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const { comment, postId } = await req.json()

    if (!postId)
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })

    const newComment = await prismadb.comment.create({
      data: {
        comment,
        userId: user.id,
        postId,
      },
    })

    return NextResponse.json({ newComment }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
