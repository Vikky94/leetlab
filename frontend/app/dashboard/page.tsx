"use client"
import React from 'react'
import { useAuthStore } from '@/store'

export default function Dashboard() {
    const { isAuthenticated } = useAuthStore();
  return (
    <div>Dashboard {isAuthenticated ? `Logged In`:`Logged Off`}</div>
  )
}
