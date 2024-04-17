import React from 'react'
import chima from "../../assets/chima.png"


const DashboardNav = () => {

  const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let email = userData.email;

  return (
    <>
    <div className='bg-white p-2 h-[75px] lg:ml-[223px] md:ml-[223px] ml-4 flex items-center'>
        <img src={chima} className='w-8 h-8 ml-4'/>
        <p className='ml-4 mt-1 font-bold'>Hello, {email || "User"}</p>
    </div>
    </>
  )
}

export default DashboardNav