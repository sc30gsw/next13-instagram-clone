'use client'

import { CameraIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useRecoilState } from 'recoil'

import { modalState } from '@/atom/modalAtom'

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null)

  const filePickerRef = useRef<HTMLInputElement | null>(null)

  const addImageToPost = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader()
      if (e.target.files && e.target.files.length > 0)
        reader.readAsDataURL(e.target.files[0])

      reader.onload = (readerEvent) =>
        setSelectedFile(readerEvent.target?.result)
    },
    [],
  )

  const closeModal = useCallback(() => {
    setOpen(false)
    setSelectedFile(null)
  }, [setOpen])

  Modal.setAppElement('#modal')
  return (
    <div id="modal">
      {open && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={open}
          onRequestClose={closeModal}
        >
          <div className="flex justify-end">
            <XMarkIcon
              onClick={closeModal}
              className="cursor-pointer h-7 text-gray-400 hover:text-gray-600"
            />
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            {selectedFile ? (
              <div className="w-full h-full relative">
                <div className="absolute top-2 right-2">
                  <XCircleIcon
                    onClick={() => setSelectedFile(null)}
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
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Please enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0"
            />
            <button
              disabled
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default UploadModal
