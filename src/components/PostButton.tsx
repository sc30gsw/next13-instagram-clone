'use client'

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import React from 'react'
import { useRecoilState } from 'recoil'

import { commentModalState } from '@/atom/commentModalAtom'
import type { Post } from '@/types/Post'

type PostButtonProps = {
  px?: string
  post: Post
}

const PostButton: React.FC<PostButtonProps> = ({ px, post }) => {
  const [open, setOpen] = useRecoilState(commentModalState)

  return (
    <>
      <div
        className={`flex justify-between ${px} pt-4 ${open && 'border-t mt-2'}`}
      >
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatBubbleOvalLeftIcon
            className="btn"
            onClick={() => setOpen(true)}
          />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {open && (
        <p className="mt-4 text-sm text-gray-500 border-b mb-2 pb-3">
          {formatDistanceToNow(new Date(post.updatedAt), {
            addSuffix: true,
            locale: enUS,
          })}
        </p>
      )}
    </>
  )
}

export default PostButton
