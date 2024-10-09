import React, {useState, useEffect} from 'react'
import phone from "../assets/pphone.png"
import "./footer.css"




const Contactnav = () => {

  


  return (
    <>
    <div className="bg-lipstick h-[45px] flex py-2 px-10 lg:px-20 font-mono font-bold lg:text-lg shadow-md floating-phone">
        <div>
            <p className="text-secondary">Customer Care:</p>
        </div>
        <div className="flex">
            <img src={phone} alt="" className='h-4 w-4 m-1' />
            <a href="tel:07073305599" className="text-secondary">0707 330 5599</a>
        </div>
    </div>
    </>
  )
}

export default Contactnav