'use client'

import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

import type { Comment } from '@/types/Comment'
import type { CommentInput } from '@/types/CommentInput'
import { schema } from '@/types/CommentInput'

type PostInputBoxProps = {
  postId: string
  isModal: boolean
}

const PostInputBox: React.FC<PostInputBoxProps> = ({ postId, isModal }) => {
  const { register, handleSubmit, reset, watch } = useForm<CommentInput>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  // commentのinput.valueを監視
  const comment = watch('comment')

  const onSubmit = async (data: CommentInput) => {
    try {
      await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: data.comment, postId }),
      })

      reset()

      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      className={`flex items-center ${isModal || 'p-4'}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FaceSmileIcon className="h-7" />
      <div className="flex-1">
        <input
          {...register('comment')}
          className="border-none w-full focus:ring-0"
          type="text"
          placeholder="Enter your comment..."
        />
      </div>
      <button
        disabled={!comment}
        type="submit"
        className="text-blue-400 font-bold disabled:text-blue-200"
      >
        Post
      </button>
    </form>
  )
}

export default PostInputBox
