import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { getServerSession } from 'next-auth'
import React from 'react'

import PostInputBox from '@/components/PostInputBox'
import options from '@/libs/options'
import { Post } from '@/types/Post'

type PostProps = {
  post: Post
}

const Post: React.FC<PostProps> = async ({ post }) => {
  const session = await getServerSession(options)
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
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatBubbleOvalLeftIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* PostComments */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{post.user.name}</span>
        {post.caption}
      </p>

      {/* PostInputBox */}
      {session && <PostInputBox />}
    </div>
  )
}

export default Post
