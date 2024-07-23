import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import "./dashboard.css"


const ChangeAdminPassword = () => {


  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
        "password": formData.password
      });
  
      let response = await fetch("https://ampupserver.onrender.com/update/admin", {
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
    <div className=''>
      <Side/>
      <div>
        <div className="sm:block hidden bg-[#F3F3F3] pt-10 pl-[223px] w-full h-screen">
          <div className=' ml-6'>
          <p className='ml-[350px] font-medium text-xl'>Change Password</p>
            <div className='ml-[280px]'>
                <form className='mb-4 mt-10' onSubmit={handleSubmit}>
                <div className="w-[350px] mt-3">
                    <div className="relative">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        </div>
                    </div>
                </div>
                <div className="w-[350px] mt-3">
                    <div className="relative">
                        <input
                        id="password"
                        name="password"
                        type="text"
                        placeholder="Input New password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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
                <span className="font-medium">Done!</span> New Password would reflect the next time you log in
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

export default ChangeAdminPassword