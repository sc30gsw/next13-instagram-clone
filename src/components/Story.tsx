import React from 'react'

import type { StoryUser } from '@/types/StoryUser'

type StoryProps = {
  storyUser: StoryUser
}

const Story: React.FC<StoryProps> = ({ storyUser }) => {
  return (
    <div>
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="h-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        src={storyUser.img}
        alt={storyUser.username}
      />
      <p className="text-xs w-14 truncate">{storyUser.username}</p>
    </div>
  )
}

export default Story
