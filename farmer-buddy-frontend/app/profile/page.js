"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const page = () => {
  const {data:session}=useSession()
  if(!session){
    const router=useRouter()
    router.push("/login")
  }
  return (
    <div>
      i am profile
    </div>
  )
}

export default page
