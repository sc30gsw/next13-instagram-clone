import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import options from '@/libs/options'
import prismadb from '@/libs/prismadb'

// Post一覧取得API
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const posts = await prismadb.post.findMany({
      include: { user: true },
      orderBy: [{ updatedAt: 'desc' }],
    })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// Post新規投稿API
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

    const { caption, image } = await req.json()

    const newPost = await prismadb.post.create({
      data: {
        caption,
        image,
        userId: user.id,
      },
    })

    return NextResponse.json({ newPost }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
