import React from 'react'
import AdminLogin from '@/components/AdminLogin'
const page = () => {
  return (
    <div className='flex justify-center items-center'>
      <AdminLogin Name={"Login"} isLoginPage={true}></AdminLogin>
    </div>
  )
}

export default page
