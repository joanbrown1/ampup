import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'
import { HiMail } from 'react-icons/hi'

const Permissions = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [admin, setAdmin] = useState("");
    const [er, setEr] = useState("");
    const [done, setDone] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        privilage: ""
    });
    const [form, setForm] = useState({
        email: "",
        privilage: ""
    });

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handle = (event) => {
        const { name, value } = event.target;
        setForm({
          ...form,
          [name]: value,
        });
      };


    const getAdmins = async () => {
        setMessage("Loading")
    
        try {
           
           let response = await fetch("https://ampupserver.onrender.com/admins", { 
             method: "GET",
             headers: {
                "Accept": "*/*"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setAdmin(data);
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
        getAdmins();
      }, []);


    const setPermissionsUp = async (e) => {
        e.preventDefault();

    
    
        try {
           
           let bodyContent = JSON.stringify({
                "email": formData.email,
                "privilage": formData.privilage,
                "password": "admin12345"
           });
           
           let response = await fetch("https://ampupserver.onrender.com/admin", { 
             method: "POST",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200 || response.status === 201) {
                setDone(true);
                getAdmins();
            } else {
                console.log("Error:", response);
                setEr(data);
                // Handle error condition accordingly
            }

            setFormData({
                email:"",
                privilage:""
            });
         
        } catch (error) {
          console.error('Error:', error);
          setEr(error)
        }
        
    };

    const editAdmin = async (e) => {
        e.preventDefault();

    
    
        try {
           
           let bodyContent = JSON.stringify({
                "email": form.email,
                "privilage": form.privilage
           });
           
           let response = await fetch("https://ampupserver.onrender.com/update/admin", { 
             method: "PUT",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setDone(true);
                getAdmins();
            } else {
                console.log("Error:", response.status);
                setEr(data);
                // Handle error condition accordingly
            }

            setForm({
                email:"",
                privilage:""
            });
         
        } catch (error) {
          console.error('Error:', error);
          setEr(error)
        }
        
    };

    
  return (
    <>
        <div className=''>
            <Side/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pb-10 pl-[223px] w-screen h-fit">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Add Permissions</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                        <Alert color="success">
                            Loading, this might take a few seconds
                        </Alert>: ""
                        }
                        <div className='bg-white rounded-lg p-5 px-10 my-10 text-gray-900 text-sm w-[989px]'>
                        <p className='text-lg font-bold text-center my-10'>Admins Details</p>
                        <div className='grid grid-cols-2 text-black font-base font-semibold'>
                            <p className=' my-4 '>Email:</p>
                            <p className=' my-4 '>Role :</p>
                        </div>
                        {admin ?
                            (admin.map((item, index) => (
                           <div className=''>
                                
                                <div key={index}>
                                    <div  className='grid grid-cols-2'>
                                        <p className=' my-4 '>{item.email}</p>
                                        <p className=' my-4 '>{item.privilage}</p>
                                    </div>
                                </div>
                                
                           </div>
                           ))) : 
                           (<p className='text-secondary text-center py-5 italic'>No admins saved</p>)}
                        </div>
                        <div className='grid grid-cols-2 w-[989px]'>
                        <div className='border border-secondary rounded-lg p-4 w-[400px] my-10'>
                            <p className='text-center py-2'>Add Admin Email</p>
                            <div className='flex justify-center items-center'>
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
                                        <select id="privilage" name="privilage" className='"py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]' style={{ fontSize: '0.8rem', height: '60px'  }} value={formData.privilage} 
                                            onChange={handleChange}>
                                            <option value="">Select Role...</option>
                                            <option value="admin">Admin</option>
                                            <option value="customercare">Customer Care</option>
                                        </select>
                                    </div>
                                    
                                    <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => setPermissionsUp(e)}>
                                    Submit
                                    </button>
                                </form>
                                
                            </div>
                                {done ? 
                                <Alert color="success" className='w-[350px]'>
                                    Done, Admin added
                                </Alert>: ""
                                }
                                {er ? 
                                <Alert color="danger" className='w-[350px]'>
                                    {er}
                                </Alert>: ""
                                }
                        </div>
                        <div className='border border-secondary rounded-lg p-4 w-[400px] my-10'>
                            <p className='text-center py-2'>Edit Admin Privilages</p>
                            <div className='flex justify-center items-center'>
                                <form className='mb-4' >
                                    <div className="w-[350px] mt-2">
                                        <div className="relative">
                                            <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={handle}
                                            style={{ fontSize: '0.8rem', height: '60px' }}
                                            className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <HiMail />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[350px] mt-2">
                                        <select id="privilage" name="privilage" className='"py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]' style={{ fontSize: '0.8rem', height: '60px'  }} value={form.privilage} 
                                            onChange={handle}>
                                            <option value="">Select Role...</option>
                                            <option value="admin">Admin</option>
                                            <option value="customercare">Customer Care</option>
                                        </select>
                                    </div>
                                    
                                    <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => editAdmin(e)}>
                                    Submit
                                    </button>
                                </form>
                                
                            </div>
                                {done ? 
                                <Alert color="success" className='w-[350px]'>
                                    Done, Admin added
                                </Alert>: ""
                                }
                                {er ? 
                                <Alert color="danger" className='w-[350px]'>
                                    {er}
                                </Alert>: ""
                                }
                        </div>
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

export default Permissions