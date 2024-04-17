import React, {useState} from 'react'
import { HiMail, HiEye, HiEyeOff, HiUser, HiPhone, HiCalculator } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
    setMessage("Loading")


    try {
     
       let bodyContent = JSON.stringify({
         "email":formData.email,
         "phonenumber":formData.phone_number,
         "meternumber":" ",
         "password":formData.password
       });
       
       let response = await fetch("https://ampupserver.onrender.com/api/users", { 
         method: "POST",
         body: bodyContent,
         headers: {
            "Content-Type": "application/json"
           }
       });
       
       let data = await response.text();
       console.log(data);
       

      setFormData({
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
      });

     navigate("/login")
    } catch (error) {
      console.error('Error:', error);
      setMessage("Error")
      setError(error)
    }
    
  };


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword)
  };
  
  return (
    <>
    <div>
        <p className='mt-20 font-bold text-2xl text-center'>Welcome to Amp Up</p>
        <p className='mt-2 text-sm text-center'>Complete the sign up to get started</p>
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
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 left-0 pl-3 flex items-center"
                        >
                        {showPassword ? <HiEye /> : <HiEyeOff />}
                        </button>
                        <input
                        id="confirm_password"
                        name="confirm_password"
                        type={showConfirmPassword ? 'text' : 'confirm_password'}
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                    </div>
                </div>
                {/* <div className="w-[350px] mt-2">
                    <div className="relative">
                        <input
                        id="meter_id"
                        name="meter_id"
                        type="text"
                        placeholder="Meter ID"
                        value={formData.meter_id}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <HiCalculator />
                        </div>
                    </div>
                </div> */}
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                Register
                </button>
            </form>
        </div>
        <div className='flex justify-center gap-x-2 mb-20'>
            <p>Already have an account?</p>
            <p className='text-[#7B0323] underline-offset-4 underline' onClick={() => {navigate("/login")}}>Login</p>
        </div>
    </div>
    
    </>
  )
}

export default SignUp