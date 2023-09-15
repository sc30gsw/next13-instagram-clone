import React from 'react'

import Post from '@/components/Post'
import type { Post as PostModel } from '@/types/Post'

const Posts = () => {
  const posts = [
    {
      id: '1',
      username: 'codewithsahand',
      userImg:
        'https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048',
      img: 'https://images.unsplash.com/photo-1694161097603-2858ec0107fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
      caption: 'Nice picture',
    },
    {
      id: '2',
      username: 'ghavidelsahand',
      userImg:
        'https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048',
      img: 'https://images.unsplash.com/photo-1683009427598-9c21a169f98f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      caption: 'New picture from my city',
    },
  ]

  return (
    <div>
      {posts.map((post: PostModel) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
