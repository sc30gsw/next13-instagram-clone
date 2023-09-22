'use client'

import { CameraIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@mui/material/Modal'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { modalState } from '@/atom/modalAtom'
import type { PostInput } from '@/types/PostInput'
import { schema } from '@/types/PostInput'

const UploadModal = () => {
  const { data: session } = useSession()

  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostInput>({ resolver: zodResolver(schema) })

  const filePickerRef = useRef<HTMLInputElement | null>(null)

  const addImageToPost = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader()
      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0])
        setValue('file', e.target.files[0])
      }

      reader.onload = (readerEvent) =>
        setSelectedFile(readerEvent.target?.result)
    },
    [setValue],
  )

  const closeModal = () => {
    setOpen(false)
    setSelectedFile(null)
    reset()
  }

  const onSubmit = async (data: PostInput) => {
    if (!session) redirect('/auth/signin')

    try {
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption: data.caption, image: selectedFile }),
      })

      router.refresh()
    } catch (err) {
      console.log(err)
    } finally {
      closeModal()
    }
  }

  return (
    <div id="modal">
      {open && (
        <Modal open={open} onClose={closeModal}>
          <div className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md">
            <div className="flex justify-end">
              <XMarkIcon
                onClick={closeModal}
                className="cursor-pointer h-7 text-gray-400 hover:text-gray-600"
              />
            </div>
            <form
              className="flex flex-col justify-center items-center h-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              {selectedFile ? (
                <div className="w-full h-full relative">
                  <div className="absolute top-2 right-2">
                    <XCircleIcon
                      onClick={() => {
                        setSelectedFile(null)
                        reset()
                      }}
                      className="cursor-pointer h-10 text-gray-800 hover:brightness-200"
                    />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedFile as string}
                    alt=""
                    className="w-full max-h-[250px] object-cover"
                  />
                </div>
              ) : (
                <CameraIcon
                  onClick={() => filePickerRef.current?.click()}
                  className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
                />
              )}

              <input
                {...register('file')}
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
              />
              {errors.file && (
                <span className="text-red-500">{errors.file.message}</span>
              )}
              <input
                {...register('caption')}
                type="text"
                maxLength={150}
                placeholder="Please enter your caption..."
                className="m-4 border-none text-center w-full focus:ring-0"
              />
              {errors.caption && (
                <span className="text-red-500">{errors.caption.message}</span>
              )}
              <button
                type="submit"
                className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125"
              >
                Upload Post
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default UploadModal
