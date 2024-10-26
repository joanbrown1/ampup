import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import "./dashboard.css"

const Faq = () => {

    let navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [faq, setFaq] = useState([]);
    const [done, setDone] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
      });

      const adminData = JSON.parse(localStorage.getItem('adminData'));
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };



    const getFaq = async () => {
        setMessage("Loading")
    
        try {
           
           let response = await fetch("https://api.powerkiosk.ng/api/faqs", { 
             method: "GET",
             headers: {
                "Accept": "*/*"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setFaq(data);
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
        getFaq();
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

    
    
        try {
           
           let bodyContent = JSON.stringify({
             "question": formData.question,
             "answer": formData.answer
           });
           
           let response = await fetch("https://api.powerkiosk.ng/api/faq", { 
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
                setDone(true);
                getFaq();
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

export default Faq