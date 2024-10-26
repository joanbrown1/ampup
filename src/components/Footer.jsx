import React from 'react'
import { Button } from 'flowbite-react';
import "./footer.css"
import kc from "../assets/phone.png"
import phone from "../assets/phone.png"
import mail from "../assets/mail.png"
import location from "../assets/location-marker.png"
import line from "../assets/Line.png"
import copyright from "../assets/copyright.png"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className='footer lg:mx-5 mb-[25px]'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 text-white pb-12'>
            
            <div className='col-span-1 mt-20 lg:ml-32 ml-8'>
                <p className='font-bold'>Explore</p>
                <br />
                <a href='/' className=' font-light'>Home</a>
                <br />
                <br />
                <a href='/buypower' className='font-light'>Buy Electricity</a>
                <br />
                <br />
                <a href='/contactus' className='font-light'>Contact Us</a>
                <br />
                <br />
                <a href='/faq' className='font-light'>FAQ</a>
            </div>
            <div className='col-span-1 mt-20 lg:ml-32 ml-8'>
                <p className='font-bold'>Contact</p>
                <div className="flex mt-2">
                    <img src={phone} className='mr-2'/>
                    <a href='tel:+2347073305599' className='font-light'>+234 707 330 5599</a>
                </div>
                <div className="flex mt-4">
                    <img src={mail} className='mr-2'/>
                    <a href='mailto:support@powerkiosk.ng' className='font-light'>support@powerkiosk.ng</a>
                </div>

                <p className='font-bold mt-5'>Terms</p>
                <div className="flex mt-1">
                    <a href='https://powerkiosk.ng/privacypolicy' className='font-light '>Privacy Policy</a>
                </div>
                <div className="flex mt-1">
                    <a href='https://powerkiosk.ng/returnpolicy' className='font-light '>Refund Policy</a>
                </div>
                
            </div>
        </div>
        <div className='flex justify-center items-center mb-4'>
            <img src={line} className='w-fit '/>
        </div>
        <div className='flex justify-center items-center pb-4 px-8'>
            <img src={copyright} className='w-5 h-5 mr-1'/>
            <p className='text-white font-thin '>Copyright 2023 | Power Kiosk Inc. All rights Reserved</p>
        </div>
    </div>
    </>
  )
}

export default Footer