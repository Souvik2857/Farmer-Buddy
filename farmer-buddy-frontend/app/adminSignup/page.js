import React from 'react'
import AdminLogin from '@/components/AdminLogin'
const page = () => {
  return (
    <div className='flex justify-center'>
      <AdminLogin Name={"SignUp"} isLoginPage={false}></AdminLogin>
    </div>
  )
}

export default page
