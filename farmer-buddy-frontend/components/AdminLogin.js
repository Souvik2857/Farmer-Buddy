"use client"
import React from 'react'
import { useState ,useRef} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
const AdminLogin = ({Name,isLoginPage}) => {
    const {data:session}=useSession()
    const [isEyeOpen, setisEyeOpen] = useState(true)
    if(session){
        const router=useRouter()
        router.push('/profile')
    }
    const [adminData, setadminData] = useState({})
    const handler=(e)=>{
        setadminData({...adminData,[e.target.name]:e.target.value})
    }
    const postAdminData=()=>{
        console.log(adminData);
        
    }
  return (
    <div>
    <div className="w-[30vw] rounded-2xl bg-[#FFF6C3] px-4 pb-8 pt-6 mt-20">
      {/* Heading */}
      <h1 className="text-center text-[28px] font-bold leading-tight text-[#6B3A2A]">
        {Name}
      </h1>
      <p className="mt-1 text-center text-sm text-[#C9B77A]">
        Welcome to Farmer Buddy
      </p>

      {/* Email / Number */}
      <div className="mt-8">
        <label className="flex items-center gap-2 text-sm font-medium text-[#4A2412]">
          <span className="inline-block h-4 w-4"><Image src={'/email.svg'} height={30} width={20}></Image></span>
          E-mail
        </label>
        <input
          type="text"
          onChange={handler}
          placeholder="Enter your e-mail"
          name='email'
          className="mt-2 h-11 w-full rounded-xs bg-white px-4 text-sm text-[#4A2412] placeholder:text-[#B5B5B5] outline-none"
        />
      </div>

      {/* Password */}
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

      {/* Forgot password */}
      <div className="mt-3 text-right">
        <a href="#" className="text-xs font-medium text-[#4A2412]">
          Forget Password?
        </a>
      </div>

      {/* Buttons */}
      <button
      onClick={()=>{postAdminData()}}
        type="button"
        className="mt-3 h-11 w-full rounded-xl bg-[#6B3426] text-base font-semibold text-white cursor-pointer"
      >
        Login
      </button>
      {isLoginPage?
      (<div className="mt-3 flex justify-center">
        <Link href={'/adminSignup'}
          type="button"
          className="rounded-xl bg-[#6B3426] px-3 py-2.5 text-xs font-semibold text-white cursor-pointer"
        >
          Sign in for the first time
        </Link>
      </div>):(
        <div className="mt-3 flex justify-center">
        <button
          type="button"
          className="rounded-xl bg-[#6B3426] px-3 py-2.5 text-xs font-semibold text-white cursor-pointer"
        >
          Already have an account? <Link className='text-blue-500 underline' href={'/adminLogin'}>Login</Link>
        </button>
      </div>
      )
      
      }
    </div>
    </div>
  )
}

export default AdminLogin
