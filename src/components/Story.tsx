import { PlusIcon } from '@heroicons/react/20/solid'
import React from 'react'

import type { SessionUser } from '@/types/SessionUser'
import type { StoryUser } from '@/types/StoryUser'

type StoryProps = {
  storyUser?: StoryUser
  session?: SessionUser | null
  isUser: boolean
}

const Story: React.FC<StoryProps> = ({ storyUser, session, isUser }) => {
  return (
    <div className="relative group cursor-pointer">
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="h-14 rounded-full p-[1.5px] border-red-500 border-2 group-hover:scale-110 transition-transform duration-200 ease-out"
        src={
          isUser && session?.user?.image
            ? (session?.user?.image as string)
            : isUser && !session?.user?.image
            ? '/images/noAvatar.png'
            : storyUser?.img
        }
        alt={isUser ? (session?.user?.name as string) : storyUser?.username}
      />
      {isUser && <PlusIcon className="h-6 absolute top-4 left-4 text-white" />}
      <p className="text-xs w-14 truncate">
        {isUser ? session?.user?.username : storyUser?.username}
      </p>
    </div>
  )
}

export default Story
