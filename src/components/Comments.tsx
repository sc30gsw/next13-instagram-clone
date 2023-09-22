'use client'

import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Modal from '@mui/material/Modal'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import type { Session } from 'next-auth'
import React from 'react'
import { useRecoilState } from 'recoil'

import { commentModalState } from '@/atom/commentModalAtom'
import PostButton from '@/components/PostButton'
import PostInputBox from '@/components/PostInputBox'
import type { Comment } from '@/types/Comment'
import type { Post } from '@/types/Post'

type CommentsProps = {
  session: Session | null
  post: Post
  comments: Comment[]
  commentCount: number
}

const Comments: React.FC<CommentsProps> = ({
  session,
  post,
  comments,
  commentCount,
}) => {
  const [open, setOpen] = useRecoilState(commentModalState)

  const closeModal = () => setOpen(false)

  return (
    <div id="commentModal">
      {session && (
        <p
          onClick={() => setOpen(true)}
          className="text-gray-500 ml-5 cursor-pointer"
        >
          View all {commentCount} comments
        </p>
      )}

      <Modal open={open} onClose={closeModal}>
        <div className="max-w-lg w-[90%] p-6 absolute top-[50%] left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md">
          <div className="flex justify-end">
            <XMarkIcon
              onClick={closeModal}
              className="cursor-pointer h-7 text-gray-400 hover:text-gray-600"
            />
          </div>
          <div className="flex items-center border-b py-4 mb-2">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className="h-7 rounded-full object-cover mr-3"
              src={post.user.image ? post.user.image : '/images/noAvatar.png'}
              alt={post.user.name}
            />
            <p className="font-bold flex-1">{post.user.name}</p>
            <EllipsisHorizontalIcon className="h-7" />
          </div>
          <div className="max-h-24 overflow-y-scroll scrollbar-none">
            {comments.map((comment: Comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-2"
              >
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  className="h-7 rounded-full object-cover"
                  src={
                    comment.user.image
                      ? comment.user.image
                      : '/images/noAvatar.png'
                  }
                  alt={comment.user.name}
                />
                <p className="font-semibold">{comment.user.name}</p>
                <p className="flex-1 truncate">{comment.comment}</p>
                <p>
                  {formatDistanceToNow(new Date(comment.updatedAt), {
                    addSuffix: true,
                    locale: enUS,
                  })}
                </p>
              </div>
            ))}
          </div>
          {session && (
            <>
              <PostButton post={post} />
              <PostInputBox postId={post.id} isModal={true} />
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Comments
