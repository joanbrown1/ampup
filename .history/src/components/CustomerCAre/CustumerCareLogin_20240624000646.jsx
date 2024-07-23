import React, {useState, useEffect} from 'react'
import { HiMail, HiEye, HiEyeOff, HiUser, HiPhone, HiCalculator } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'

const CustomerCareLogin = () => {

    let  navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [admins, setAdmins] =  useState("");
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


    const  handleLogin = async (e) =>{
        e.preventDefault()
        
        
            try {
               
               let bodyContent = JSON.stringify(formData);
               
               let response = await fetch("https://ampupserver.onrender.com/admins/email", { 
                 method: "POST",
                 body: bodyContent,
                 headers: {
                  "Content-Type": "application/json"
                 }
               });
               
               let data = await response.json();
               console.log(data);
    
                // Check if the status is 200
                if (response.status === 200) {
                    navigate("/admin/searchuser")
                } else {
                    console.log("Error:", response.status);
                    setAdmins("none")
                    // Handle error condition accordingly
                }
    
             
            } catch (error) {
              console.error('Error:', error);
              setAdmins("none")
            }
            
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
  
  return (
    <>
    <div>
        <p className='mt-20 font-bold text-2xl text-center'>Welcome Back</p>
        <p className='mt-2 text-sm text-center'>Kindly fill Admin details to login</p>
        <div className='flex justify-center items-center my-10'>
            <form className='mb-4' >
                <div className="w-[350px] mt-2">
                    <div className="relative">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <HiMail />
                        </div>
                    </div>
                </div>
                <div className="w-[350px] mt-2">
                    <div className="relative">
                        <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 left-0 pl-3 flex items-center"
                        >
                        {showPassword ? <HiEye /> : <HiEyeOff />}
                        </button>
                        <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                    </div>
                </div>
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => handleLogin(e)}>
                Login
                </button>
            </form>
        </div>
        {admins ? 
        <Alert color="failure" className='mb-10'>
            <span className="font-medium">Error!</span> Email is not an Admin
        </Alert>: ""
        }
        
    </div>
    
    </>
  )
}

export default CustomerCareLogin