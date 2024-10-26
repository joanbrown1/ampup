import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import "./dashboard.css"

const Disco = () => {

    let navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const [discos, setDiscos] = useState([]);

    const getDisco = () => {
        fetch('https://api.powerkiosk.ng/api/discos')
      .then(response => response.json())
      .then(data => {
        setDiscos(data); // Set the discos data in state
      })
      .catch(error => {
        console.error("There was an error fetching the discos!", error);
      });
    };

  // Fetch discos data from the backend on component mount
  useEffect(() => {
    getDisco()
  }, []);

  // Function to handle the toggle of active status
  const handleToggle = (id, active) => {
    fetch('https://api.powerkiosk.ng/api/disco/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active: !active }), // Include id in the body
      })
        .then(response => response.json())
        .then(data => {
          // Handle success or update state
          console.log(data.message);
        })
        .catch(error => {
          console.error("There was an error updating the disco!", error);
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
                        <p className='text-lg font-medium mb-4'>Disco Management</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        <div className='w-full mb-20'>
                        <div className='items-center justify-center gap-4'>
                            {discos.map(disco => (
                                <div key={disco.id} className="bg-gray-50 hover:shadow-md grid grid-cols-3 border border-gray-400 rounded-lg p-4 my-5 px-10 w-full">
                                    <img src={disco.logo} alt={disco.name} className="w-[60px] h-[40px]" />
                                    <span className="text-lg font-medium">{disco.name}</span>
                                    <button
                                        onClick={() => handleToggle(disco.id, disco.active)}
                                        className={`toggle-btn px-4 py-2 font-semibold text-white rounded-md ${
                                        disco.active ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    >
                                        {disco.active ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                            ))}
                            
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

export default Disco