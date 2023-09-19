import type { Session } from 'next-auth'

export type SessionUser = Session & {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    username?: string | null
    uid?: string | null
  }
}
