"use client"
import React from 'react'
import { useState ,useRef} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
const AdminLogin = ({Name}) => {
    const {data:session}=useSession()
    const [isEyeOpen, setisEyeOpen] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const router=useRouter()
    if(session){
        router.push('/profile')
    }
    const verifiCation = useRef()
    const [adminData, setadminData] = useState({})
    const handler=(e)=>{
        setadminData({...adminData,[e.target.name]:e.target.value})
    }
    const postAdminData=async()=>{
        verifiCation.current.style.color="green"
        verifiCation.current.innerText="Verifying Admin Credentials"
        const res=await fetch('http://localhost:5000/api/v1/admin/adminLogin',
          {
            method:'POST',
            credentials:'include',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(adminData)
          })
          const data=await res.json()
          if(data.status===200){
            verifiCation.current.innerText="Admin verified"
            router.push('/profile')
            setisLoggedIn(true)
          }
          else if(data.status===401 || data.status===404){
          verifiCation.current.style.color="red"
          verifiCation.current.innerText=`${data.message}`        
        }
   
    }
  return (
    <div>
    <div className="w-[30vw] rounded-2xl bg-[#FFF6C3] px-4 pb-8 pt-6 mt-20">

      <h1 className="text-center text-[28px] font-bold leading-tight text-[#6B3A2A]">
        {Name}
      </h1>
      <p className="mt-1 text-center text-sm text-[#C9B77A]">
        Welcome to Farmer Buddy
      </p>

      <div className="mt-8">
        <label className="flex items-center gap-2 text-sm font-medium text-[#4A2412]">
          <span className="inline-block h-4 w-4"><Image src={'/email.svg'} height={30} width={20}></Image></span>
          E-mail
        </label>
        <input
          type="email"
          onChange={handler}
          placeholder="Enter your e-mail"
          name='email'
          className="mt-2 h-11 w-full rounded-xs bg-white px-4 text-sm text-[#4A2412] placeholder:text-[#B5B5B5] outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#4A2412]">
          <span className="inline-block h-4 w-4"><Image src={'/pass.svg'} height={20} width={30}></Image></span>
          Password
        </label>
        <div className="relative mt-2">
          <input
            type={!isEyeOpen?'text':'password'}
            onChange={handler}
            placeholder="Enter your password"
            name='password'
            className="h-11 w-full rounded-xs bg-white pl-4 pr-12 text-sm text-[#4A2412] placeholder:text-[#B5B5B5] outline-none"
          />
          <span className="absolute right-4 top-1/2 inline-block h-5 w-5 -translate-y-1/2 cursor-pointer">
            <Image src={isEyeOpen?'/eyeClose.svg':'/eye.svg'} onClick={()=>{setisEyeOpen(!isEyeOpen)}} height={20} width={30}></Image>
          </span>
        </div>
      </div>

      <div className="mt-3 text-right">
        <a href="#" className="text-xs font-medium text-[#4A2412]">
          Forget Password?
        </a>
      </div>
      <div ref={verifiCation} className='text-center text-red-900 font-bold'></div>
      <button
      onClick={()=>{postAdminData()}}
        type="button"
        className="mt-3 h-11 w-full rounded-xl bg-[#6B3426] text-base font-semibold text-white cursor-pointer"
      >
        Login
      </button>
    
    </div>
    </div>
  )
}

export default AdminLogin
