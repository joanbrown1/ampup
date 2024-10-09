import React, {useState} from 'react'
import { HiMail, HiEye, HiEyeOff} from 'react-icons/hi';
import { useAuth } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import { PaystackButton } from 'react-paystack'
import "./home.css"
import arm from "../../assets/arm.png"
import armsm from "../../assets/armsm.png"
import speed from "../../assets/time.png"
import click from "../../assets/one.png"
import secure from "../../assets/secure.png"
import orange from "../../assets/orange.png"
import green from "../../assets/green.png"
import yellow from "../../assets/yellow.png"
import blue from "../../assets/blue.png"
import purple from "../../assets/purple.png"
import white from "../../assets/white.png"
import history from "../../assets/history.png"
import innovation from "../../assets/innovation.png"
import payw from "../../assets/payw.png"
import paywsm from "../../assets/paymentw.jpg"
import smile from "../../assets/paym.png"
import android from "../../assets/andriod.png"
import apple from "../../assets/apple.png"
import PageLoader from "./PageLoader"

const Home = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
        const user = data.data.user;
        if (user) {
          const authUserData = user;
          localStorage.setItem('authUserData', JSON.stringify(authUserData));
          login(authUserData);
          navigate("/buypower");
        } else {
          setError("Invalid email or password"); // Handle invalid credentials
        }
      } else {
        setError(data.message || "An error occurred"); // Handle other errors
      }
  
      setFormData({
        email: "",
        password: ""
      });
  
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred"); // Generic error message for unexpected errors
    }
  
    setMessage(""); // Clear loading message
  };
  

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
    <div className='background2 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:h-[500px] md:h-[500px]'>
      <div className='col-span-1'>

      </div>
      <div className='col-span-1 lg:mt-26 md:mt-20 md:ml-0 ml-10 mt-10'>
      <p className='text-3xl text-white pb-5 font-bold italic'>Login To Buy Power</p>
        <form className='mb-4' onSubmit={handleSubmit}>
            <div className="w-[300px] lg:w-[350px] mt-2">
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
            <div className="w-[300px] lg:w-[350px] mt-2">
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
            
            <button className='bg-[#7B0323] w-[300px] lg:w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
            Login
            </button>
        </form>
        {error ? 
        <Alert color="failure" onDismiss={() => navigate("/login")} className='mb-10 w-[300px] lg:w-[350px]'>
            <span className="font-medium">Error!</span> {error}
        </Alert>: ""
        }
        <div className='flex gap-x-2 mb-5 text-white'>
            <p>Don't have an account?</p>
            <p className='text-[#7B0323] underline-offset-4 underline font-bold' onClick={() => {navigate("/signup")}}>Register</p>
        </div>
        <div className='flex gap-x-2 mb-20 text-white'>
            <p>Forgot Password?</p>
            <p className='text-[#7B0323] underline-offset-4 underline font-bold' onClick={() => {navigate("/forgotpassword")}}>Click Here</p>
        </div>
      </div>
    </div>
    <div className='font lg:pl-[100px] md:pl-[120px]'>

      {/* Download Button */}
    
    {/* <div className='background1 hidden sm:block'>
      <div className='flex justify-center items-center pt-20 pl-[-100px]'>
          <div>
            <p className='pt-4 text-lg font-bold'>Download App</p>
          </div>
          <div className="flex">
            <div className="rounded-full flex border-secondary border-2 w-[200px] justify-center items-center p-2 mx-4">
              <p className='text-lg font-bold'>Andriod</p>
              <img src={android} alt="android" className='w-8 h-8 ml-2'/>
            </div>
            <div className="rounded-full flex border-secondary border-2 w-[200px] justify-center items-center p-2">
              <p className='text-lg font-bold'>IOS</p>
              <img src={apple} alt="apple" className='w-8 h-8 ml-2'/>
            </div>
          </div>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='text-left mt-[50px]  rounded-lg pl-20 pt-20 shadow-md md:pl-0'>
          <p className='fontlg mb-3'>
          Pay your Light bills with Power Kiosk
          </p>
          <p className='w-[420px] text-md'>
          Where paying your electricity bills is as simple as a swipe. Welcome to the future of convenience, right at your fingertips.
          </p>
          <div className='flex mt-4'>
            <button className='bg-[#7B0323] rounded-md px-8 py-3 text-white' onClick={() => navigate("/login")}>
              Login
            </button>
            <p className='text-[#7B0323] underline-offset-4 underline ml-8 mt-2' onClick={() => navigate("/login")}>
              I need more explanation
            </p>
          </div>
        </div>
        <div>
          <img src={arm} className='w-[570px] mt-10'/>
        </div>
      </div>
    </div>
    <div className='background1 lg:hidden md:hidden'>
      <div className='flex pt-20 mx-4'>
        <div>
          <p className='pt-4 text-lg font-bold'>Download App</p>
        </div>
        <div className="flex">
          <div className="rounded-full flex border-secondary border-2 py-2 px-2 justify-center items-center mx-2">
            <p className='text-lg font-bold'>Andriod</p>
            <img src={android} alt="android" className='w-8 h-8 ml-2'/>
          </div>
          <div className="rounded-full flex border-secondary border-2 py-2 px-3 justify-center items-center ">
            <p className='text-lg font-bold'>IOS</p>
            <img src={apple} alt="apple" className='w-8 h-8 ml-2'/>
          </div>
      </div>
    </div>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='text-left mx-8 mt-14'>
          <p className='fontsm mb-3'>
          Pay your Light bills with Power Kiosk
          </p>
          <p className='text-md'>
            where paying your electricity bills is as simple as a swipe. Welcome to the future of convenience, right at your fingertips.
          </p>
         
          <div className='flex mt-4'>
            <button className='bg-[#7B0323] rounded-md px-4 py-2 text-white' onClick={() => navigate("/login")}>
              Login
            </button>
            <p className='text-[#7B0323] underline-offset-4 underline ml-4 mt-2' onClick={() => navigate("/login")}>
              I need more explanation
            </p>
          </div>
        </div>
        
        <div>
          <img src={armsm} className='w-[570px] lg:ml-[90px]'/>
        </div>
      </div>
    </div> */}

    <div className='lg:pr-[150px] md:pr-[150px] px-8 lg:px-0 md:px-0'>
      <p className='text-center text-3xl font-bold my-20'>Why Choose Power Kiosk</p>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12'>
        <div>
          <img src={speed} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
            Lightning Speed
          </p>
          <p className='px-5 pb-5 font-light'>
            Power Kiosk guarantees instant transactions, sparing you time in today's fast-paced world. Click, pay, done – no more queues or delays.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#FA5252]'>Learn more</p>
            <img src={orange} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={click} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          One-Click Convenience
          </p>
          <p className='px-5 pb-5 font-light'>
          Simplify payments with Power Kiosk's one-click feature. Effortlessly complete transactions, no manual processes needed. Enjoy ease with every tap.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#94D82D]'>Learn more</p>
            <img src={green} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={secure} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Fortified Security
          </p>
          <p className='px-5 pb-5 font-light'>
          Rest assured, Power Kiosk's robust security shields your transactions. Your sensitive information stays protected throughout, giving you peace of mind.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#FCC419]'>Learn more</p>
            <img src={yellow} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={history} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Transaction Transparency
          </p>
          <p className='px-5 pb-5 font-light'>
          Power Kiosk offers transparent payment tracking, ensuring financial control. Access your transaction history easily for full transparency.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#5C7CFA]'>Learn more</p>
            <img src={blue} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={innovation} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Future-Proof Innovation
          </p>
          <p className='px-5 pb-5 font-light'>
          Revolutionize payments with Power Kiosk. Embrace cutting-edge tech for streamlined finance. Stay ahead, never settle for old ways.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#4E2391]'>Learn more</p>
            <img src={purple} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <img src={payw} className='rounded-lg hidden sm:block'/>
        <img src={paywsm} className='rounded-sm lg:hidden md:hidden'/>
        <div className='bg-[#FFE9EF] py-2 px-10 rounded-lg shadow-lg mt-10'>
          <div className='grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 my-10 '>
            <div className='lg:col-span-2 md:col-span-2'>
              <p className='hidden sm:block text-3xl font-bold text-left'>
              About <br/> Power Kiosk
              </p>
              <p className='text-center text-3xl font-bold lg:hidden md:hidden'>About Power Kiosk</p>
            </div>
            <div className='lg:col-span-3 md:col-span-3'>
              <p className='my-5 lg:my-0 md:my-0'>
              Power Kiosk: Revolutionize your electricity payments and beyond. Seamlessly manage all your utility expenses in one place. With a user-friendly interface and secure transactions, Power Kiosk puts control at your fingertips. Say goodbye to hassle and embrace convenience. Experience the future of utility payments with Power Kiosk
              </p>
            </div>
          </div>
          <div className='flex justify-center items-center mb-5'>
            <button className='bg-[#7B0323] rounded-md px-6 py-4 text-white shadow-2xl flex' onClick={() => navigate("/login")}>
              Get Started
              <img src={white} className='w-[24px] h-[24px] ml-2'/>
            </button>
          </div>
        </div>
      </div>
    </div>
   
    </div>
    </>
    }
    </>
  )
}

export default Home