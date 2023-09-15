import React from 'react'

import Posts from '@/components/Posts'
import Stories from '@/components/Stories'

const Feed = () => {
  return (
    <>
      <section>
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      <section>
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </>
  )
}

export default Feed
