'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import type { SessionUser } from '@/types/SessionUser'

type MiniProfileProps = {
  session?: SessionUser | null
}

const MiniProfile: React.FC<MiniProfileProps> = ({ session }) => {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={
          session?.user?.image
            ? (session.user.image as string)
            : '/images/noAvatar.png'
        }
        alt={session?.user?.name as string}
        className="h-16 rounded-full border p-[2px]"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button
        onClick={() => signOut()}
        className="font-semibold text-blue-400 text-sm"
      >
        Sign out
      </button>
    </div>
  )
}

export default MiniProfile
