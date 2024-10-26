import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import { Alert } from 'flowbite-react';
import "./dashboard.css"
import { message } from 'antd';

const Announcements = () => {

    
    let navigate = useNavigate();

    const adminData = JSON.parse(localStorage.getItem('adminData'));


    const [announcements, setAnnouncements] = useState([]);
    const [message, setMessage] = useState("");

    const getAnnouncement = () => {
        fetch('https://api.powerkiosk.ng/api/announcements')
      .then(response => response.json())
      .then(data => {
        setAnnouncements(data); // Set the announcements data in state
      })
      .catch(error => {
        console.error("There was an error fetching the announcements!", error);
      });
    };

  // Fetch announcements data from the backend on component mount
  useEffect(() => {
    getAnnouncement()
  }, []);
;


    const setAnnouncementsUp = async (e) => {
        e.preventDefault();
        fetch('https://api.powerkiosk.ng/api/announcement/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: 1, message: message }), // Include id in the body
          })
            .then(response => response.json())
            .then(data => {
              // Handle success or update state
              console.log(data.message);
              getAnnouncement();
            })
            .catch(error => {
              console.error("There was an error updating the announcement!", error);
            });
    };

    
  return (
    <>
    <div className='mb-[30px] lg:grid lg:grid-cols-12'>
      <div className='lg:col-span-2'>
          <Side/>
      </div>
      <div className='lg:col-span-10'>
          <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Add Announcements</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                        <Alert color="success">
                            Loading, this might take a few seconds
                        </Alert>: ""
                        }
                        <div className='bg-white rounded-lg p-5 my-5 italic text-secondary w-[989px]'>
                            <p className='font-semibold my-4 text-lg'>{announcements}</p>
                        </div>
                        <div className='my-10'>
                            <p className='font-semibold text-gray-700 my-4 text-lg'>Make New Announcement:</p>
                            <div className="w-[989px] mt-2">
                                <div className="relative">
                                    <input
                                    id="message"
                                    name="message"
                                    type="text"
                                    placeholder="Write announcement here"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setAnnouncementsUp(e);
                                        }
                                    }}
                                    style={{ fontSize: '1rem', height: '70px' }}
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
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

export default Announcements