export type Comment = {
  id: string
  comment: string
  createAt: string
  updatedAt: string
  postId: string
  userId: string
  user: {
    name: string
    image: string
  }
  post: {
    user: {
      name: string
      image: string
    }
  }
}
