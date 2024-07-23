import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './SideBar'
import Footer from './footer'
import pic from "../../assets/puser.png"
import edit from "../../assets/edit.png"
import tick from "../../assets/tickk.png"
import arrow from "../../assets/arrow-right.png"
import setttings from "../../assets/set.png"
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'


const Profile = () => {


    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [transaction, setTransaction] = useState([]);


      
    
  return (
    <>
        <div className='mb-[30px]'>
            <Sidebar/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 pl-[223px] w-full h-screen">
                    <div className=' flex justify-center items-center'>
                       
                            <div className='rounded-lg bg-slate-50 p-5 shadow-lg'>
                                <p className='text-center font-medium text-xl'>Profile</p>
                                <div className='grid grid-cols-2'>
                                    <div>
                                        <img src={pic}/>
                                        <div className='text-sm font-medium'>
                                            <div className='flex'>
                                                <p className='text-secondary my-1'>verified</p>
                                                <img src={tick} className='w-4 h-4 mt-1 ml-1'/>
                                            </div>
                                            <p>{userData.email}</p>
                                            <p>{userData.phonenumber}</p>
                                            <p>Meter: {userData.meternumber}</p>
                                        </div>
                                    </div>
                                    <button onClick={()=>navigate('/editprofile')} className='bg-secondary hover:bg-gray-400 rounded h-[40px] w-[100px] ml-20 mt-4 text-white flex pl-6 pt-2'>
                                        Edit 
                                        <img src={edit} className='w-4 mt-1 ml-1'/>
                                    </button>
                                </div>
                                <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-10 cursor-pointer' onClick={() => navigate("/changepassword")}>
                                    <img src={setttings} className='w-6 h-6'/>
                                    <p className='ml-4 text'>Change Password</p>
                                    <img src={arrow} className='w-6 h-6 ml-[150px]'/>
                                </div>
                                <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-5 cursor-pointer' onClick={() => navigate("/changemeter")}>
                                    <img src={setttings} className='w-6 h-6'/>
                                    <p className='ml-4 text'>Change Meter Number</p>
                                    <img src={arrow} className='w-6 h-6 ml-[110px]'/>
                                </div>
                                <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-5 cursor-pointer' onClick={() => navigate("/contactus")}>
                                    <img src={setttings} className='w-6 h-6'/>
                                    <p className='ml-4 text'>Help </p>
                                    <img src={arrow} className='w-6 h-6 ml-[240px]'/>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center">
                    <div className='my-10 '>
                    <div className=' flex justify-center items-center'>
                       
                       <div className='rounded-lg bg-slate-50 p-5 shadow-lg'>
                           <p className='text-center font-medium text-xl'>Profile</p>
                           <div className='grid grid-cols-2'>
                               <div>
                                   <img src={pic}/>
                                   <div className='text-sm font-medium'>
                                       <div className='flex'>
                                           <p className='text-secondary my-1'>verified</p>
                                           <img src={tick} className='w-4 h-4 mt-1 ml-1'/>
                                       </div>
                                       <p>{userData.email}</p>
                                       <p>{userData.phonenumber}</p>
                                       <p>Meter: {userData.meternumber}</p>
                                   </div>
                               </div>
                               <button onClick={()=>navigate('/editprofile')} className='bg-secondary hover:bg-gray-400 rounded h-[40px] w-[100px] ml-10 mt-4 text-white flex pl-6 pt-2'>
                                   Edit 
                                   <img src={edit} className='w-4 mt-1 ml-1'/>
                               </button>
                           </div>
                           <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-10 cursor-pointer' onClick={() => navigate("/changepassword")}>
                               <img src={setttings} className='w-6 h-6'/>
                               <p className='ml-4 text'>Change Password</p>
                               <img src={arrow} className='w-6 h-6 ml-[120px]'/>
                           </div>
                           <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-5 cursor-pointer' onClick={() => navigate("/changemeter")}>
                               <img src={setttings} className='w-6 h-6'/>
                               <p className='ml-4 text'>Change Meter Number</p>
                               <img src={arrow} className='w-6 h-6 ml-[90px]'/>
                           </div>
                           <div className='h-[64px] w-full rounded-xl shadow pl-2 pt-5 flex bg-white font-medium mt-5 cursor-pointer' onClick={() => navigate("/contactus")}>
                               <img src={setttings} className='w-6 h-6'/>
                               <p className='ml-4 text'>Help </p>
                               <img src={arrow} className='w-6 h-6 ml-[220px]'/>
                           </div>
                       </div>
               </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Profile