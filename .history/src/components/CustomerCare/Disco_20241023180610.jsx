import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import "./dashboard.css"

const Disco = () => {

    let navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem('adminData'));


    
  return (
    <>
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
            <div className='lg:col-span-2'>
                <Side/>
            </div>
            <div className='lg:col-span-10'>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Disco Management</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        <div className='w-fit mb-20'>
                        <div className='items-center justify-center gap-4'>
                            <img src={ikedc} className='w-[50px] '/>
                            <img src={ekedc} className='w-[50px] '/>
                            <img src={kedco} className='w-[50px] '/>
                            <img src={phedc} className='w-[50px] '/>
                            <img src={jed} className='w-[50px] '/>
                            <img src={ibedc} className='w-[50px] '/>
                            <img src={kaedco} className='w-[50px] '/>
                            <img src={aedc} className='w-[50px] '/>
                            <img src={eedc} className='w-[50px] '/>
                            <img src={bedc} className='w-[50px] '/>
                            <img src={apl} className='w-[50px] '/>
                            <img src={yedc} className='w-[50px] '/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center mb-20">
                    <div className='my-10 '>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <p className='text-secondary my-10 italic text-lg'>Kindly view with desktop</p>
                       
                    </div>
                </div>
            </div>
            <Foot/>
        </div>
    </>
  )
}

export default Disco