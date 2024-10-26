import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import "./dashboard.css"
import aedc from "../../assets/aedc.png"
import apl from "../../assets/apl.png"
import bedc from "../../assets/bedc.png"
import eedc from "../../assets/eedc.png"
import ekedc from "../../assets/ekedc.png"
import ibedc from "../../assets/ibedc.png"
import ikedc from "../../assets/ikedc.png"
import jed from "../../assets/jed.png"
import kaedco from "../../assets/kaedco.png"
import kedco from "../../assets/kedco.png"
import phedc from "../../assets/phedc.png"
import yedc from "../../assets/yedc.png"

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
                        </div> <option value="ikeja-electric">IKEDC - Ikeja Electric</option>
                                    <option value="eko-electric">EKEDC - Eko Electric</option>
                                    <option value="kano-electric">KEDCO - Kano Electric</option>
                                    <option value="portharcourt-electric">PHED - Port Harcourt Electric</option>
                                    <option value="jos-electric">JED - Jos Electric</option>
                                    <option value="ibadan-electric">IBEDC - Ibadan Electric</option>
                                    <option value="kaduna-electric">KAEDCO - Kaduna Electric</option>
                                    <option value="abuja-electric">AEDC - Abuja Electric</option>
                                    <option value="enugu-electric">EEDC - Enugu Electric</option>
                                    <option value="benin-electric">BEDC - Benin Electric</option>
                                    <option value="aba-electric">ABA - Aba Electric</option>
                                    <option value="yola-electric">YEDC - Yola Electric</option>
                        <div className='w-fit mb-20'>
                        <div className='items-center justify-center gap-4'>
                            <div className="flex">
                                <img src={ikedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>IKEDC - Ikeja Electric</p>
                            </div>
                            <div className="flex">
                                <img src={ekedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>EKEDC - Eko Electric</p>
                            </div>
                            <div className="flex">
                                <img src={kedco} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>KEDCO - Kano Electric</p>
                            </div>
                            <div className="flex">
                                <img src={phedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>PHED - Port Harcourt Electric</p>
                            </div>
                            <div className="flex">
                                <img src={jed} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>JED - Jos Electric</p>
                            </div>
                            <div className="flex">
                                <img src={ibedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>IBEDC - Ibadan Electric</p>
                            </div>
                            <div className="flex">
                                <img src={kaedco} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>KAEDCO - Kaduna Electric</p>
                            </div>
                            <div className="flex">
                                <img src={aedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>AEDC - Abuja Electric</p>
                            </div>
                            <div className="flex">
                                <img src={eedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>EEDC - Enugu Electric</p>
                            </div>
                            <div className="flex">
                                <img src={bedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>BEDC - Benin Electric</p>
                            </div>
                            <div className="flex">
                                <img src={apl} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>ABA - Aba Electric</p>
                            </div>
                            <div className="flex">
                                <img src={yedc} className='w-[100px] mr-10'/>
                                <p className='text-lg font-medium'>YEDC - Yola Electric</p>
                            </div>
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