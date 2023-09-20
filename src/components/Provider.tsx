'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type ProviderProps = {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  )
}

export default Provider
