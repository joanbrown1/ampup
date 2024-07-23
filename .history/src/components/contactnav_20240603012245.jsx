import React, {useState, useEffect} from 'react'
import phone from "../assets/pphone.png"




const Contactnav = () => {

  


  return (
    <>
    <div className="bg-lipstick flex">
        <div>
            <p className="text-secondary">Customer Careline</p>
        </div>
        <div className="ml-auto flex">
            <img src={phone} alt="" />
            <a href="tel:07073305599" className="text-secondary">0707 330 5599</a>
        </div>
    </div>
    </>
  )
}

export default Contactnav