import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const Charges = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [charge, setCharge] = useState("");
    const [newCharge, setNewCharge] = useState("");
    const [done, setDone] = useState(false);

    const adminData = JSON.parse(localStorage.getItem('adminData'));


    const getCharges = async () => {
        setMessage("Loading")
    
        try {
           
           let response = await fetch("https://ampupserver.onrender.com/charges", { 
             method: "GET",
             headers: {
                "Accept": "*/*"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setCharge(data[0].charge);
            } else {
                console.log("Error:", response.status);
                // Handle error condition accordingly
            }
            setMessage("")

        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    useEffect(() => {
        getCharges();
      }, []);


    const setChargesUp = async (e) => {
        e.preventDefault();

    
    
        try {
           
           let bodyContent = JSON.stringify({
             "charge": newCharge
           });
           
           let response = await fetch("https://ampupserver.onrender.com/charge", { 
             method: "POST",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setDone(true);
                getCharges();
            } else {
                console.log("Error:", response.status);
                // Handle error condition accordingly
            }

         
        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    
  return (
    <>
    <div className='mb-[30px] lg:grid lg:grid-cols-12'>
      <div className='lg:col-span-2'>
          <Side/>
      </div>
      <div className='lg:col-span-10'>
          <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Add Charges</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                        <Alert color="success">
                            Loading, this might take a few seconds
                        </Alert>: ""
                        }
                        <div className='bg-white rounded-lg p-5 my-5 italic text-secondary w-[989px]'>
                            <p className='font-semibold my-4 text-lg'>Current Charge: {charge}</p>
                        </div>
                        <div className='my-10'>
                            <p className='font-semibold text-gray-700 my-4 text-lg'>Input New Charge:</p>
                            <div className="w-[989px] mt-2">
                                <div className="relative">
                                    <input
                                    id="newcharge"
                                    name="newcharge"
                                    type="number"
                                    placeholder="100"
                                    value={newCharge}
                                    onChange={(e) => setNewCharge(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setChargesUp(e);
                                        }
                                    }}
                                    style={{ fontSize: '1rem', height: '70px' }}
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                        </div>
                        {done ? 
                        <Alert color="success">
                            Charges Set!
                        </Alert>: null
                        }
                        
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

export default Charges