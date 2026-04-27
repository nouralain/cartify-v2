"use client"
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import {Provider} from "react-redux"

export default function ProviderWrapper({children}:{children:React.ReactNode}) {
  return (
   <Provider store={store}>
     <SessionProvider>
        {children}
        <Toaster />
    </SessionProvider>
   </Provider>
  )
}
