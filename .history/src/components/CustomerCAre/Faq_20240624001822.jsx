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
           
           let response = await fetch("https://ampupserver.onrender.com/faqs", { 
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
           
           let response = await fetch("https://ampupserver.onrender.com/faq", { 
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
        <div className=''>
            <Side/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pb-10 pl-[223px] w-screen h-fit">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Add Faq</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                        <Alert color="success">
                            Loading, this might take a few seconds
                        </Alert>: ""
                        }
                        {faq.length > 0 ?
                        <>
                        {faq.map((data, index) => (
                            <div className='bg-white rounded-lg p-5 my-5 italic text-secondary w-[989px]'>
                                <ul key={index} className='my-4'>
                                    <li className='font-semibold my-2 text-lg'>{data.question}</li>
                                    <li className='font-semibold my-2 text-lg'>{data.answer}</li>
                                </ul>
                            </div>
                        ))}
                        </> : 
                        <div className='bg-white rounded-lg p-5 my-5 italic text-secondary w-[989px]'>
                            <p className='font-semibold my-4 text-lg'>No FAQs saved yet</p>
                        </div>}
                        
                        <div className='my-10'>
                            <p className='font-semibold text-gray-700 my-4 text-lg'>Input New FAQ:</p>
                            <form className='mb-4' onSubmit={handleSubmit}>
                                <div className="w-[989px] mt-2">
                                    <div className="relative">
                                        <input
                                        id="question"
                                        name="question"
                                        type="text"
                                        placeholder="Type out the question"
                                        value={formData.question}
                                        onChange={handleChange}
                                        style={{ fontSize: '1rem', height: '70px' }}
                                        className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                        />
                                    </div>
                                </div>
                                <div className="w-[989px] mt-2">
                                    <div className="relative">
                                        <input
                                        id="answer"
                                        name="answer"
                                        type="type"
                                        placeholder="Type out the answer"
                                        value={formData.answer}
                                        onChange={handleChange}
                                        style={{ fontSize: '1rem', height: '70px' }}
                                        className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                        />
                                    </div>
                                </div>
                                
                                <button className='bg-[#7B0323] w-[989px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' type='submit'>
                                Submit
                                </button>
                            </form>
                        </div>
                        {done ? 
                        <Alert color="success">
                            FAQ Saved!
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

export default Faq