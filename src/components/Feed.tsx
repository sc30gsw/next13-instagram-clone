import { getServerSession } from 'next-auth'
import React from 'react'

import MiniProfile from '@/components/MiniProfile'
import Posts from '@/components/Posts'
import Stories from '@/components/Stories'
import Suggestions from '@/components/Suggestions'
import options from '@/libs/options'

const Feed = async () => {
  const session = await getServerSession(options)
  return (
    <>
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories session={session} />
        {/* Posts */}
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* MiniProfile */}
          <MiniProfile session={session} />
          {/* Suggestions */}
          <Suggestions />
        </div>
      </section>
    </>
  )
}

export default Feed
