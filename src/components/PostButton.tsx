'use client'

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartFillIcon } from '@heroicons/react/24/solid'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { commentModalState } from '@/atom/commentModalAtom'
import type { Like } from '@/types/Like'
import type { Post } from '@/types/Post'

type PostButtonProps = {
  px?: string
  post: Post
}

const PostButton: React.FC<PostButtonProps> = ({ px, post }) => {
  const [open, setOpen] = useRecoilState(commentModalState)
  const [likes, setLikes] = useState<Like[]>([])
  const router = useRouter()

  // いいね済みかどうかを判定
  const isPostLiked = likes.some((like: Like) => like.postId === post.id)

  useEffect(() => {
    const fetchAlreadyLiked = async () => {
      try {
        const response = await fetch(`/api/like/${post.id}/alreadyLike`, {
          cache: 'no-store',
        })
        const res = await response.json()

        setLikes(res.likes)
      } catch (err) {
        throw new Error('Something went wrong')
      }
    }

    fetchAlreadyLiked()
  }, [post.id])

  const handleLike = useCallback(async () => {
    try {
      await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      })

      const response = await fetch(`/api/like/${post.id}/alreadyLike`, {
        cache: 'no-store',
      })
      const res = await response.json()

      setLikes(res.likes)

      router.refresh()
    } catch (err) {
      throw new Error('Something went wrong')
    }
  }, [post.id, router])

  const deleteLike = useCallback(async () => {
    try {
      await fetch('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      })

      const response = await fetch(`/api/like/${post.id}/alreadyLike`, {
        cache: 'no-store',
      })
      const res = await response.json()

      setLikes(res.likes)

      router.refresh()
    } catch (err) {
      throw new Error('Something went wrong')
    }
  }, [post.id, router])

  return (
    <>
      <div
        className={`flex justify-between ${px} pt-4 ${open && 'border-t mt-2'}`}
      >
        <div className="flex space-x-4">
          {isPostLiked ? (
            <HeartFillIcon className="btn text-red-400" onClick={deleteLike} />
          ) : (
            <HeartIcon className="btn" onClick={handleLike} />
          )}
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
