import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import options from '@/libs/options'
import prismadb from '@/libs/prismadb'

// ユーザーがいいねした投稿を取得
export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } },
) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const session = await getServerSession(options)

    if (!session)
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

    const user = await prismadb.user.findUnique({
      where: { email: session.user?.email as string },
    })

    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    if (typeof params.postId !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    if (!params.postId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })

    const likes = await prismadb.like.findMany({
      where: {
        userId: user.id,
      },
    })

    return NextResponse.json({ likes }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
