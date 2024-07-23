import React, {useState, useEffect} from 'react'
import phone from "../assets/pphone.png"




const Contactnav = () => {

  


  return (
    <>
    <div className="bg-lipstick flex py-2 px-10 font-mono font-bold text-lg">
        <div>
            <p className="text-secondary">Customer Careline</p>
        </div>
        <div className="ml-auto flex">
            <img src={phone} alt="" className='h-4 w-4 m-1' />
            <a href="tel:07073305599" className="text-secondary">0707 330 5599</a>
        </div>
    </div>
    </>
  )
}

export default Contactnav