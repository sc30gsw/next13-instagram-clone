import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { getServerSession } from 'next-auth'
import React from 'react'

import Comments from '@/components/Comments'
import PostButton from '@/components/PostButton'
import PostInputBox from '@/components/PostInputBox'
import Provider from '@/components/Provider'
import options from '@/libs/options'
import type { Comment } from '@/types/Comment'
import { Post } from '@/types/Post'

const fetchComments = async (postId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/comment/${postId}`,
      { cache: 'no-store' },
    )

    const res: { comments: Comment[]; commentCount: number } =
      await response.json()

    return { comments: res.comments, commentCount: res.commentCount }
  } catch (err) {
    throw new Error('Failed to fetch comments for post')
  }
}

type PostProps = {
  post: Post
}

const Post: React.FC<PostProps> = async ({ post }) => {
  const session = await getServerSession(options)
  const { comments, commentCount } = await fetchComments(post.id)

  return (
    <div className="bg-white my-7 border rounded-md">
      {/* PostHeader */}
      <div className="flex items-center p-5">
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={post.user.image ? post.user.image : '/images/noAvatar.png'}
          alt={post.user.name}
        />
        <p className="font-bold flex-1">{post.user.name}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* PostImage */}
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="object-cover w-full"
        src={post.image}
        alt={post.caption}
      />

      {/* PostButtons */}
      {session ? (
        <Provider>
          <PostButton px="px-4" post={post} />
          <p className="p-5 truncate">
            <span className="font-bold mr-2">{post.user.name}</span>
            {post.caption}
          </p>
          {comments.length > 0 && (
            <Comments
              session={session}
              post={post}
              comments={comments}
              commentCount={commentCount}
            />
          )}
        </Provider>
      ) : (
        <Provider>
          <p className="p-5 truncate">
            <span className="font-bold mr-2">{post.user.name}</span>
            {post.caption}
          </p>
          {comments.length > 0 && (
            <Comments
              session={session}
              post={post}
              comments={comments}
              commentCount={commentCount}
            />
          )}
        </Provider>
      )}

      {/* PostInputBox */}
      {session && <PostInputBox postId={post.id} isModal={false} />}
    </div>
  )
}

export default Post
