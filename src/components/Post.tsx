/* eslint-disable @next/next/no-img-element */
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { Post } from '@/types/Post'

type PostProps = {
  post: Post
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* PostHeader */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={post.userImg}
          alt={post.username}
        />
        <p className="font-bold flex-1">{post.username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* PostImage */}
      <img className="object-cover w-full" src={post.img} alt={post.caption} />
    </div>
  )
}

export default Post
