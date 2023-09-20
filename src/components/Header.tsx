'use client'

import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { modalState } from '@/atom/modalAtom'

const Header = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Left */}
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
            alt="Instagram"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
            alt="Instagram Icon"
            layout="fill"
            className="object-contain"
          />
        </div>

        {/* Middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <MagnifyingGlassIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/* Right */}
        <div className="flex space-x-4 items-center">
          <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              />
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
      </div>
    </div>
  )
}

export default Header
