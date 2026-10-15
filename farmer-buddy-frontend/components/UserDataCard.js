import React from 'react'

const UserDataCard = ({email,createdAt}) => {
  return (
    <div className='border w-[60vw] h-[70vh] bg-amber-100' >
      hello {email} this document is created at {createdAt}
    </div>
  )
}

export default UserDataCard
