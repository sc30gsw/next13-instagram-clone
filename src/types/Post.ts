export type Post = {
  id: string
  caption: string
  image: string
  createdAt: string
  updatedAt: string
  userId: string
  user: {
    name: string
    image: string
  }
}
