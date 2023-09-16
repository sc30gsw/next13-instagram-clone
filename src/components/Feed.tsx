import React from 'react'

import Posts from '@/components/Posts'
import Stories from '@/components/Stories'

const Feed = () => {
  return (
    <>
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </>
  )
}

export default Feed
