"use client"
import React from 'react'
import { useAuthStore } from '@/store'

export default function Dashboard() {
    const { isAuthenticated } = useAuthStore();
    console.log(`isAuthenticated -> ${isAuthenticated}`)
  return (
    <div className='w-full flex justify-center items-center border-2 border-indigo-600'>
      <div className='m-5'>Dashboard {isAuthenticated ? `Logged In`:`Logged Off`}</div>
    </div>
  )
}
