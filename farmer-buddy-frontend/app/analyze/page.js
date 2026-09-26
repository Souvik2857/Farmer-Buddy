"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
const page = () => {
  const {data:session}=useSession()
  return (
    <>
    <div className='flex gap-3'>
    <div className="recent-search bg-[#FFF9D6] w-[22vw] h-[82.5vh]">
      <div className='flex items-center gap-2 mb-2'>
      <Image src={'/clock.svg'} width={20} height={20} className='ml-2 mt-7'></Image><p className='font-bold mt-7' >Recent Searches</p>
      </div>
      <div className='search-history flex flex-col gap-2 ml-5'>
        <div className='bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer' >
          <p className='font-bold'>Tomato leaf Disease</p>
          <p className='text-xs'>Fungal infection</p>
          <p className='text-xs'>Date:- 19 sept 2026</p>
        </div>
        <div className='bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer' >
          <p className='font-bold'>Tomato leaf Disease</p>
          <p className='text-xs'>Fungal infection</p>
          <p className='text-xs'>Date:- 19 sept 2026</p>
        </div>
        <div className='bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer' >
          <p className='font-bold'>Tomato leaf Disease</p>
          <p className='text-xs'>Fungal infection</p>
          <p className='text-xs'>Date:- 19 sept 2026</p>
        </div>
      </div>
    </div>
    <div className="analyze-ai flex justify-center w-[78vw]">
        <p className='text-xl'>Ask me anything about crops, pests
          weather, soil or farming</p>
    </div>
    </div>
    </>
  )
}

export default page
