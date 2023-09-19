import 'minifaker/locales/en'

import minifaker from 'minifaker'
import React, { useEffect, useState } from 'react'

import Story from '@/components/Story'
import type { SessionUser } from '@/types/SessionUser'
import type { StoryUser } from '@/types/StoryUser'

type StoriesProps = {
  session: SessionUser | null
}

const Stories: React.FC<StoriesProps> = ({ session }) => {
  const storyUsers: StoryUser[] = minifaker.array(20, (i: number) => ({
    id: i,
    username: minifaker.username({ locale: 'en' }).toLowerCase(),
    img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  }))

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {session && <Story session={session} isUser={true} />}
      {storyUsers.map((user: StoryUser) => (
        <Story key={user.id} storyUser={user} isUser={false} />
      ))}
    </div>
  )
}

export default Stories
