import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'flowbite-react';
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import { HiCalculator } from 'react-icons/hi';


const ChangeMeter = () => {


  const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

  const userData = storedUserData;

  let meterno = userData.meternumber

  let email = userData.email

  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: email,
    meternumber: ""
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Loading");
    setError(""); // Clear previous errors
  
    try {
      let bodyContent = JSON.stringify({
        "email": formData.email,
        "meternumber": formData.meternumber
      });
  
      let response = await fetch("https://ampupserver.onrender.com/updatemeter", {
        method: "PUT",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      let data = await response.json();
  
      if (response.ok) { // Check if response is successful
        setMessage("Done")
      } else {
        setError(data.message || "An error occurred"); // Handle other errors
      }
  
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred"); // Generic error message for unexpected errors
    }
  
  };



  


  return (
    <>
    <div className='mb-[30px] lg:grid lg:grid-cols-12'>
    <div className='lg:col-span-2'>
        <Sidebar/>
    </div>
    <div className='lg:col-span-10'>
        <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
          <div className=' ml-6'>
          <p className='ml-[350px] font-medium text-xl'>Change Meter Number</p>
            <div className='ml-[280px]'>
                <form className='mb-4 mt-10' onSubmit={handleSubmit}>
                <div className="w-[350px] mt-3">
                    <div className='bg-white h-[60px] py-2 px-5 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]'>
                        <p className='pt-2'>Current Meter Number: {meterno || "None Yet"}</p>
                    </div>
                </div>
                <div className="w-[350px] mt-3">
                    <div className="relative">
                        <input
                        id="meternumber"
                        name="meternumber"
                        type="text"
                        placeholder="Input New Meter Number"
                        value={formData.meternumber}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <HiCalculator />
                        </div>
                    </div>
                </div>
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                Submit
                </button>
            </form>
            {message && message === "Loading" ? 
            <Alert color="warning" className='mb-10 w-[350px]'>
                <span className="font-medium">Loading!</span> This might take a few seconds
            </Alert>: ""
            }
            {message && message === "Done" ? 
            <Alert color="success" className='mb-10 w-[350px]'>
                <span className="font-medium">Done!</span> New Meter Number would reflect the next time you log in
            </Alert>: ""
            }
            {error ? 
            <Alert color="failure" className='mb-10 w-[350px]'>
                <span className="font-medium">Error!</span> {error}
            </Alert>: ""
            }
            </div>
          </div>
        </div>
        <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center">
          <div className='my-10 '>
          <p className='text-center font-medium text-xl'>Change Meter Number</p>
            <div className=''>
                <form className='mb-4 mt-10' onSubmit={handleSubmit}>
                <div className="w-[350px] mt-3">
                    <div className='bg-white h-[60px] py-2 px-5 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]'>
                        <p className='pt-2'>Current Meter Number: {meterno || "None Yet"}</p>
                    </div>
                </div>
                <div className="w-[350px] mt-3">
                    <div className="relative">
                        <input
                        id="meternumber"
                        name="meternumber"
                        type="text"
                        placeholder="Input New Meter Number"
                        value={formData.meternumber}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <HiCalculator />
                        </div>
                    </div>
                </div>
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                Submit
                </button>
            </form>
            {message && message === "Loading" ? 
            <Alert color="warning" className='mb-10 w-[350px]'>
                <span className="font-medium">Loading!</span> This might take a few seconds
            </Alert>: ""
            }
            {message && message === "Done" ? 
            <Alert color="success" className='mb-10 w-[350px]'>
                <span className="font-medium">Done!</span> New Meter Number would reflect the next time you log in
            </Alert>: ""
            }
            {error ? 
            <Alert color="failure" className='mb-10 w-[350px]'>
                <span className="font-medium">Error!</span> {error}
            </Alert>: ""
            }
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default ChangeMeter