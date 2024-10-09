import React, { useState } from 'react'
import { HiMail, HiEye, HiEyeOff, HiPhone, HiPencil } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import PageLoader from "../Home/PageLoader"

const SignUp = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: ""
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

    try {
      let bodyContent = JSON.stringify({
        "name":formData.name,
        "email": formData.email,
        "phonenumber": formData.phone_number,
        "meternumber": " ",
        "password": formData.password
      });

      let response = await fetch("https://api.powerkiosk.ng/api/api/users", {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json"
        }
      });

      let data = await response.text();
      console.log(data);

      if (response.status === 200) {
        setFormData({
          name:"",
          email: "",
          phone_number: "",
          password: "",
          confirm_password: ""
        });
        setMessage("Success");

        // Delay navigation to the login page by 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.status === 400) {
        setMessage("Password");
      } else {
        setMessage("Error");
        setError(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Error");
      setError(error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
    {message === "Success" && (
          <Alert color="success" onDismiss={() => navigate("/login")} className='mb-10'>
            <span className="font-medium">Registration Successful, kindly login</span>
          </Alert>
        )}
    {
      message && message === "Loading"? 
      <div className='items-center justify-center flex h-[650px] lg:h-[300px]'>
        <PageLoader/>
      </div>
      :
      <>
      <div>
        <p className='mt-20 font-bold text-2xl text-center'>Welcome to Power Plus</p>
        <p className='mt-2 text-sm text-center'>Complete the sign up to get started</p>
        <div className='flex justify-center items-center my-10'>
          <form className='mb-4' onSubmit={handleSubmit}>
            <div className="w-[350px] mt-2">
              <div className="relative">
                <input
                  id="name"
                  name="name" 
                  type="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ fontSize: '0.8rem', height: '60px' }}
                  className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <HiPencil />
                </div>
              </div>
            </div>
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
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  style={{ fontSize: '0.8rem', height: '60px' }}
                  className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <HiPhone />
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
            <div className="w-[350px] mt-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
                </button>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  style={{ fontSize: '0.8rem', height: '60px' }}
                  className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                />
              </div>
            </div>

            <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
              Register
            </button>
          </form>
        </div>
        {message === "Password" && (
          <Alert color="warning" className='mb-10'>
            <span className="font-medium">Password too weak</span>
          </Alert>
        )}
        {message === "Error" && (
          <Alert color="failure" onDismiss={() => navigate("/signup")} className='mb-10'>
            <span className="font-medium">Error!</span> {error.message}
          </Alert>
        )}
        
        <div className='flex justify-center gap-x-2 mb-20'>
          <p>Already have an account?</p>
          <p className='text-[#7B0323] underline-offset-4 underline' onClick={() => { navigate("/login") }}>Login</p>
        </div>
      </div>
    </> 
    }
    </>
  )
}

export default SignUp
