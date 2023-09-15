import 'minifaker/locales/en'

import minifaker from 'minifaker'
import React, { useEffect, useState } from 'react'

import Story from '@/components/Story'
import type { StoryUser } from '@/types/StoryUser'

const Stories = () => {
  const storyUsers: StoryUser[] = minifaker.array(20, (i: number) => ({
    id: i,
    username: minifaker.username({ locale: 'en' }).toLowerCase(),
    img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  }))

  return (
    <div>
      {storyUsers.map((user: StoryUser) => (
        <Story key={user.id} storyUser={user} />
      ))}
    </div>
  )
}

export default Stories
