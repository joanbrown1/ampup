import React, {useState, useEffect} from 'react'
import chima from "../../assets/chima.png"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SmSidebar from './SmSidebar';



const DashboardNav = () => {

  // const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

  //   const userData = storedUserData;

  //   let email = userData.email;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <>
    <div className='bg-white p-2 h-[75px] lg:ml-[223px] md:ml-[223px] ml-4 flex items-center'>
        <img src={chima} className='w-8 h-8 ml-4'/>
        <p className='ml-4 mt-1 font-bold'>Hello, {email || "User"}</p>
        {/* <p className='ml-4 mt-1 font-bold'>Hello, User</p> */}
        <div className="lg:hidden md:hidden ml-[170px] rounded-md p-2 text-gray-400 hover:bg-[#4E2391] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            {isSidebarOpen ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" onClick={toggleSidebar} />
            : <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={toggleSidebar} /> 
          }
         </div>
    </div>
    {isSidebarOpen && <SmSidebar />}
    </>
  )
}

export default DashboardNav