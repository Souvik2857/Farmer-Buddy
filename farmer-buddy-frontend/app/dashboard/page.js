"use client"
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import UserDataCard from '@/components/UserDataCard'
const page = () => {
    const router=useRouter()
    const [verified, setVerified] = useState(false)
    const [loading, setloading] = useState(true)
    const [location, setlocation] = useState("")
    const [userLogs, setUserLogs] = useState([])
    const [filteredLogs, setFilteredLogs] = useState([])
    const [currentLog, setcurrentLog] = useState(null)
    const [isLogOpen, setisLogOpen] = useState(false)
    const logCondition = useRef()
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
                setlocation(data.city)
                setUserLogs([...userLogs,...data.users])
                setFilteredLogs([...filteredLogs,...data.users])            
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
  const bgByConfidence = {
  green: "bg-[#99FF99]",
  yellow: "bg-[#FFA555]",
  red: "bg-[#CE0000]",
};

    const filterdUser=(isApproved)=>{
    if(isApproved==="Low"){
      logCondition.current.style.backgroundColor="red"
      logCondition.current.innerText="Assistance required"
      logCondition.current.style.color="white"
    }
    if(isApproved==="Moderate"){
      logCondition.current.style.backgroundColor="#FFA85C"
      logCondition.current.innerText="Moderate Issues"
      logCondition.current.style.color="white"
    }
    if(isApproved==="True"){
      logCondition.current.style.backgroundColor="#5CFF73"
      logCondition.current.innerText="Auto Approved"
      logCondition.current.style.color="black"
    }
    const filtered= userLogs.filter(item=>item.isApproved===isApproved)     
    setFilteredLogs(filtered)
}
  const setCurrentLog=(email,createdAt)=>{
      setisLogOpen(true)
      setcurrentLog({email:email,createdAt:createdAt})
  }
  const closeCurrentLog=()=>{
    setisLogOpen(false)
    setcurrentLog(null)
  }
  return (
    <>
    <div className="h-[70vh] w-[70vw] mx-auto bg-[#FFF0A5] px-4 pt-2 pb-6 relative">
      {/* Location */}
      <div className="flex justify-end">
        <input className='border text-center bg-amber-900 text-white p-3 rounded-2xl' type="text" readOnly value={location}/>
      </div>
      {/* Status pills */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={()=>{filterdUser("Low")}}
          className="p-5 cursor-pointer rounded-full bg-[#D40000] py-1 text-[16px] font-medium text-white"
          >
          Assistance Required
        </button>
        <button
          type="button"
          onClick={()=>{filterdUser("Moderate")}}
          className="p-5 cursor-pointer rounded-full bg-[#FFA85C] py-1 text-[16px] font-medium text-[#1A1AFF]"
          >
          Moderate Issues
        </button>
        <button
          type="button"
          onClick={()=>{filterdUser("True")}}
          className="p-5 cursor-pointer rounded-full bg-[#5CFF73] py-1 text-[16px] font-medium text-black"
          >
          Correct Solutions
        </button>
      </div>
          <button ref={logCondition} className='mt-6 rounded-xl py-2 font-bold px-3 bg-white '>
            All Logs
          </button>

      {/* Category box */}
      <div className="mt-5 h-[55vh] flex flex-col gap-5 items-center rounded-[28px] overflow-auto bg-[#D9D9D9]">
      {filteredLogs.map((items,index)=>{

      return  (<div key={index} className={`mt-5 grid grid-cols-3 w-full max-w-[60vw] items-center justify-center rounded-2xl ${bgByConfidence[items?.confidence]} px-3 py-6 text-sm text-black`}>
      <span className="">•User: {items?.userEmail}</span>
      <span className="">{items?.conversation?.user}</span>
      <span className="flex justify-end"><Image onClick={()=>{setCurrentLog(items.userEmail,items.createdAt)}} src={'/expand.svg'} alt='expand' width={20} height={20} className='cursor-pointer'></Image></span>
    </div>)
    })}
      </div>
      {isLogOpen&&<div className='absolute top-10 right-20'><UserDataCard email={currentLog.email} createdAt={currentLog.createdAt}></UserDataCard>
      <Image src={'/cross.svg'} onClick={()=>{closeCurrentLog()}} className='absolute top-3 right-2 cursor-pointer' alt='cross' width={20} height={20}></Image></div>}
    </div>

    </>
  )
}

export default page
