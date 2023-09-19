'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { schema, type SignUpForm } from '@/types/SingUpInput'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(schema) })

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/')
      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }, [email, password, router])

  const signUp = useCallback(async () => {
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      login()
    } catch (err) {
      console.log(err)
    }
  }, [name, email, password, login])

  const onSubmit = (data: SignUpForm) => {
    signUp()
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
          <h2 className="text-lg text-gray-500 italic mt-5 font-semibold">
            Sign up and check your friends’ photos and videos
          </h2>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <form
          className="flex flex-col gap-4 lg:w-[30%] w-[40%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              {...register('name')}
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md appearance-none focus:outline-none focus:ring-0 peer"
              placeholder="  "
            />
            <label
              className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              htmlFor="name"
            >
              Username
            </label>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
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
            Sign Up
          </button>
          <div className="text-center">
            <Link
              className="mt-4 text-blue-400 hover:underline"
              href="/auth/signin"
            >
              Do you have an account?
            </Link>
          </div>
          <button
            type="button"
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

export default SignUpPage
