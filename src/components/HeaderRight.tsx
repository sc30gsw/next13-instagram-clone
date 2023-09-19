'use client'
import { HomeIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'

type HeaderRightProps = {
  session: Session | null
}

const HeaderRight: React.FC<HeaderRightProps> = ({ session }) => {
  return (
    <div className="flex space-x-4 items-center">
      <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
      {session ? (
        <>
          <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            onClick={() => signOut()}
            src={
              session.user?.image
                ? (session.user.image as string)
                : '/images/noAvatar.png'
            }
            alt={session.user?.name as string}
            className="h-10 rounded-full cursor-pointer"
          />
        </>
      ) : (
        <Link href="/auth/signin">Sign in</Link>
      )}
    </div>
  )
}

export default HeaderRight
