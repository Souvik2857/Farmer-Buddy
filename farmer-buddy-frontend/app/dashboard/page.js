"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
    const router=useRouter()
    const [verified, setVerified] = useState(false)
    const [loading, setloading] = useState(true)
    const [location, setlocation] = useState("")
    const [userLogs, setUserLogs] = useState([])
    useEffect(() => {
        const verifiedAdmin=async()=>{
            try {
                const res=await fetch("http://localhost:5000/api/v1/admin/verifyAdmin",{
                    credentials:'include'
                })
                const data=await res.json()
                
                if(data.status===200){
                    setVerified(true)
                    setloading(false)
                const userData=await fetch("http://localhost:5000/api/v1/admin/getUserDetails",
                  {
                    credentials:'include'
                  }
                )
                const data=await userData.json()
                console.log(data.users);
                setlocation(data.city)
                setUserLogs([...userLogs,data.users])            
                }
                else{
                    setloading(false)
                }
            } catch (error) {
                console.log(error);      
            }
        }
        verifiedAdmin()
    }, [])
    useEffect(() => {
        if(loading){
            return
        }
        if(!verified){
            router.push('/adminLogin')
        }
    }, [loading,verified])
  return (
    <>
    <div className="h-[70vh] w-[70vw] mx-auto bg-[#FFF0A5] px-4 pt-2 pb-6">
      {/* Location */}
      <div className="flex justify-end">
        <input className='border text-center bg-amber-900 text-white p-3 rounded-2xl' type="text" value={location}/>
      </div>
      {/* Status pills */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          className="p-5 cursor-pointer rounded-full bg-[#D40000] py-1 text-[16px] font-medium text-white"
          >
          Assistance Required
        </button>
        <button
          type="button"
          className="p-5 cursor-pointer rounded-full bg-[#FFA85C] py-1 text-[16px] font-medium text-[#1A1AFF]"
          >
          Moderate Issues
        </button>
        <button
          type="button"
          className="p-5 cursor-pointer rounded-full bg-[#5CFF73] py-1 text-[16px] font-medium text-black"
          >
          Correct Solutions
        </button>
      </div>
          <button className='mt-6 rounded-xs px-3 bg-white'>
            All items
          </button>

      {/* Category box */}
      <div className="mt-5 flex h-[93px] items-center justify-center rounded-[28px] bg-[#D9D9D9]">
        <p className="text-sm text-black">Please Select your Category</p>
      </div>
    </div>

    </>
  )
}

export default page
