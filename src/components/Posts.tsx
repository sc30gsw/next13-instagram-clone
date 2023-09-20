import React from 'react'

import Post from '@/components/Post'
import type { Post as PostModel } from '@/types/Post'

const fetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/post`, {
      cache: 'no-store',
    })
    const res = await response.json()

    const posts: PostModel[] = res.posts

    return posts
  } catch (err) {
    console.log(err)
  }
}

const Posts = async () => {
  const posts = await fetchPosts()
  return (
    <div>
      {posts?.map((post: PostModel) => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Posts
