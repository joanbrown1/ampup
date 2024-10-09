import React, {useState} from 'react'
import { HiMail, HiEye, HiEyeOff, HiUser, HiPhone, HiCalculator } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/DataContext';
import PageLoader from "../Home/PageLoader"

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  
      let response = await fetch("https://api.powerkiosk.ng/api/api/authUser", {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      let data = await response.json();
  
      if (response.ok) { // Check if response is successful
        const user = data;
        if (user) {
          const authUserData = user;
          localStorage.setItem('authUserData', JSON.stringify(authUserData));
          login(authUserData);
          navigate("/buypower");
        } else {
          setError("Invalid email or password"); // Handle invalid credentials
          setMessage(""); // Clear loading message
        }
      } else {
        setError(data.message || "An error occurred"); // Handle other errors
        setMessage(""); // Clear loading message
      }
  
      setFormData({
        email: "",
        password: ""
      });
  
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred"); // Generic error message for unexpected errors
      setMessage(""); // Clear loading message
    }
  
    setMessage(""); // Clear loading message
  };
  


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword)
  };
  
  return (
    <>
    {
      message && message === "Loading"? 
      <div className='items-center justify-center flex h-[650px] lg:h-[300px]'>
        <PageLoader/>
      </div>
      :
      <>
    <div>
        <p className='mt-20 font-bold text-2xl text-center'>Welcome Back</p>
        <p className='mt-2 text-sm text-center'>Fill in your details to get back in</p>
        <div className='flex justify-center items-center my-10'>
            <form className='mb-4' onSubmit={handleSubmit}>
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
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                Login
                </button>
            </form>
        </div>
        {message && message === "Error" ? 
        <Alert color="failure" onDismiss={() => navigate("/login")} className='mb-10'>
            <span className="font-medium">Error!</span> {error}
        </Alert>: ""
        }
        <div className='flex justify-center gap-x-2 mb-5'>
            <p>Don't have an account?</p>
            <p className='text-[#7B0323] underline-offset-4 underline' onClick={() => {navigate("/signup")}}>Register</p>
        </div>
        <div className='flex justify-center gap-x-2 mb-20'>
            <p>Forgot Password?</p>
            <p className='text-[#7B0323] underline-offset-4 underline' onClick={() => {navigate("/forgotpassword")}}>Click here</p>
        </div>
    </div>
    
    </>
    }
    </>
  )
}

export default Login