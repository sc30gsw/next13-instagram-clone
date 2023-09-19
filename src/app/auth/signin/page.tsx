'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import options from '@/libs/options'
import type { SignInForm } from '@/types/SignInInput'
import { schema } from '@/types/SignInInput'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<SignInForm>({ resolver: zodResolver(schema) })

  const login = useCallback(async () => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })

      // next-authのsignInのエラーメッセージ(authorize関数)
      if (result?.error) {
        switch (result.error) {
          case 'Email does not exists':
            setError('email', {
              type: 'manual',
              message: 'Email does not exist.',
            })
            break

          case 'Incorrect password':
            setError('password', {
              type: 'manual',
              message: 'Incorrect password.',
            })
            break
        }
        redirect('/auth/signin')
      }

      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }, [email, password, router, setError])

  const onSubmit = (data: SignInForm) => {
    login()
    reset()
  }

  return (
    <div className="lg:py-10">
      <div className="flex justify-center md:space-x-7 mt-10">
        <Image
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://superviral.com.au/wp-content/uploads/2021/08/instagix-banner-graphic.png"
          alt="instagram-image"
          width={192}
          height={192}
        />
        <div className="flex items-center flex-col">
          <Image
            className="w-32 object-cover"
            src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
            alt=""
            width={128}
            height={128}
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <form
          className="flex flex-col gap-4 lg:w-[30%] w-[40%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              {...register('email')}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md  appearance-none focus:outline-none focus:ring-0 peer"
              placeholder="  "
            />
            <label
              className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              htmlFor="email"
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="relative">
            <input
              {...register('password')}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md  appearance-none focus:outline-none focus:ring-0 peer"
              placeholder="  "
            />
            <label
              className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              htmlFor="password"
            >
              Password
            </label>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-400 py-3 text-white rounded-md w-full mt-10 hover:bg-blue-500 transition"
          >
            Sign In
          </button>
          <div className="text-center">
            <Link
              className="mt-4 text-blue-400 hover:underline"
              href="/auth/signup"
            >
              Don’t have an account yet?
            </Link>
          </div>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
