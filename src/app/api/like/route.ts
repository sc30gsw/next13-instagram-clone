import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import options from '@/libs/options'
import prismadb from '@/libs/prismadb'

// いいね登録API
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

    const { postId } = await req.json()

    if (!postId)
      return NextResponse.json({ message: 'Invalid post id' }, { status: 404 })

    const alreadyLiked = await prismadb.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    })

    if (alreadyLiked) {
      return NextResponse.json(
        { message: 'Duplicated liked by post' },
        { status: 400 },
      )
    }

    const newLike = await prismadb.like.create({
      data: {
        userId: user.id,
        postId,
      },
    })

    return NextResponse.json({ newLike }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// いいね削除API
export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'DELETE')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const session = await getServerSession(options)

    if (!session)
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

    const user = await prismadb.user.findUnique({
      where: { email: session.user?.email as string },
    })

    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const { postId } = await req.json()

    if (!postId)
      return NextResponse.json({ message: 'Invalid post id' }, { status: 404 })

    const alreadyLiked = await prismadb.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    })

    if (!alreadyLiked) {
      return NextResponse.json(
        { message: 'Not liked by post' },
        { status: 400 },
      )
    }

    const deleteLike = await prismadb.like.delete({
      where: { id: alreadyLiked.id },
    })

    return NextResponse.json({ deleteLike }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
