import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import { HiEye, HiEyeOff, HiUserCircle } from 'react-icons/hi';
import "./dashboard.css"

const SearchUser = () => {

    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const [search, setSearch] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    

    useEffect(() => {
        const getUsers = async () => {
            // e.preventDefault();
           setMessage("Loading")
        
        
            try {
               
               let response = await fetch("https://api.powerkiosk.ng/api/users", { 
                 method: "GET",
                 headers: {
                    "Accept": "*/*"
                 }
               });
               
               let data = await response.json();
            //    console.log(data);
    
                // Check if the status is 200
                if (response.status === 200) {
                    setUsers(data);
                } else {
                    console.log("Error:", response.status);
                    // Handle error condition accordingly
                }
    
                setMessage("");
             
            } catch (error) {
              console.error('Error:', error);
            }
            
        };

        getUsers();
    }, []);

    
    // Calculate index of the first and last user to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


   
    const handleUserClick = (email) => {
        navigate('/admin/user/'+ email);
    };

   

    const formatDate = (inputDate) => {
    // console.log('Input Date:', inputDate);
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
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
                        <p className='text-lg font-medium mb-4'>User</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        <div className='my-10'>
                            <p className='font-semibold text-gray-700 my-4 text-lg'>Search user Email:</p>
                            <div className="w-[989px] mt-2">
                                <div className="relative">
                                    <input
                                    id="meter_number"
                                    name="meter_number"
                                    type="text"
                                    placeholder="admin@gmail.com"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUserClick(userEmail);
                                        }
                                    }}
                                    style={{ fontSize: '1rem', height: '70px' }}
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                        </div>
                        {message === "Searching" ? 
                        <Alert color="success" className='w-[989px]'>
                            Searching, this might take a few seconds
                        </Alert>: ""
                        }
                        <div className='bg-white rounded-lg p-5 px-20 text-gray-900 text-sm w-[989px]'>
                        <div className=''>
                        <p className='text-lg font-bold text-center my-10'>Users</p>
                            <div>
                                <div className='flex text-black font-base font-semibold'>
                                    <p className=' my-4 min-w-[250px]'>Email:</p>
                                    <p className=' my-4 min-w-[250px]'>Phone Number:</p>
                                    <p className=' my-4 min-w-[250px]'>Meter Number:</p>
                                    <p className=' my-4 min-w-[250px]'>See Transactions</p>
                                </div>
                            </div>
                        {currentUsers.length > 0 ? (
                            <div className="">
                                <div className=''>
                                    {currentUsers.map((user, index) => (
                                        <div key={index} onClick={() => handleUserClick(user.email)} style={{ cursor: 'pointer' }}>
                                            <div className='flex'>
                                                <p className='my-4 min-w-[250px]'>{user.email}</p>
                                                <p className='my-4 min-w-[250px]'>{user.phonenumber}</p>
                                                <p className='my-4 min-w-[250px]'>{user.meternumber}</p>
                                                <div className='flex items-center min-w-[250px]'><HiEyeOff /></div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No users found.</p>
                        )}
                        </div>

                        {/* Pagination */}
                        <div className='pagination text-center mt-6'>
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded  ${
                                        currentPage === index + 1 ? ' text-blue-500' : ' text-gray-700'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        </div>
                        <a href='https://api.powerkiosk.ng/api/download/users'>
                            <button className='bg-[#7B0323] w-[400px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg'>
                            Download All Users Details
                            </button>
                        </a>
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

export default SearchUser