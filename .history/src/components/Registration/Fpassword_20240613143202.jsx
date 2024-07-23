import React, {useState} from 'react'
import { HiMail } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'

const Fpassword = () => {
    const navigate = useNavigate();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          let bodyContent = JSON.stringify({
            "email": email
          });
      
          let response = await fetch("https://ampupserver.onrender.com/password", {
            method: "POST",
            body: bodyContent,
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          let data = await response.json();
      
          if (response.ok) { // Check if response is successful
            setSent(true);
          } else {
            console.log(response);
          }
      
        } catch (error) {
          console.error('Error:', error);
        }
      
      };

  return (
    <>
    <div>
        <p className='mt-2 text-sm text-center'>Kindly fill your email address registered</p>
        <div className='flex justify-center items-center my-10'>
            <form className='mb-4' onSubmit={handleSubmit}>
                <div className="w-[350px] mt-2">
                    <div className="relative">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleChange}
                        style={{ fontSize: '0.8rem', height: '60px' }}
                        className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <HiMail />
                        </div>
                    </div>
                </div>
                
                <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                Enter
                </button>
            </form>
        </div>
        {sent ? 
        <Alert color="success" className='mb-10'>
             A mail has been sent to this email address
        </Alert>: ""
        }
        <div className='flex justify-center gap-x-2 mb-20'>
            <p>Don't have an account?</p>
            <p className='text-[#7B0323] underline-offset-4 underline' onClick={() => {navigate("/signup")}}>Register</p>
        </div>
    </div>
    
    </>
  )
}

export default Fpassword
