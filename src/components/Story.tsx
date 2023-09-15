/* eslint-disable @next/next/no-img-element */
import React from 'react'

import type { StoryUser } from '@/types/StoryUser'

type StoryProps = {
  storyUser: StoryUser
}

const Story: React.FC<StoryProps> = ({ storyUser }) => {
  return (
    <div>
      <img className="h-14" src={storyUser.img} alt={storyUser.username} />
      <p>{storyUser.username}</p>
    </div>
  )
}

export default Story
