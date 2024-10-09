import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const TransactionHistory = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [transaction, setTransaction] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const adminData = JSON.parse(localStorage.getItem('adminData'));


    const getTransactions = async () => {
        // e.preventDefault();
       setMessage("Loading")
    
    
        try {
           
           let response = await fetch("https://api.powerkiosk.ng/api/transactions", { 
             method: "GET",
             headers: {
                "Accept": "*/*"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setTransaction(data.reverse());
            } else {
                console.log("Error:", response.status);
                // Handle error condition accordingly
            }

            setMessage("");
         
        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    useEffect(() => {
        getTransactions();
      }, []);

       // Calculate index of the first and last user to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = transaction.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const formatDate = (inputDate) => {
    // console.log('Input Date:', inputDate);
    
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
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
                        <p className='text-lg font-medium mb-4'>All Transaction History</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                            <Alert color="success">
                                Loading, this might take a few seconds
                            </Alert>: null
                        }
                        <div className='bg-white rounded-lg p-5 px-20 text-gray-900 text-sm w-[989px] my-10'>
                            <p className='text-lg font-bold text-center my-10'>Transaction History</p>
                        <div className='overflow-x-auto'>
                            <div>
                                <div className='flex text-black font-base font-semibold'>
                                    <p className=' my-4 min-w-[275px]'>Email:</p>
                                    <p className=' my-4 min-w-[275px]'>Phone Number:</p>
                                    <p className=' my-4 min-w-[275px]'>Date:</p>
                                    <p className=' my-4 min-w-[275px]'>Meter Number:</p>
                                    <p className=' my-4 min-w-[275px]'>Amount Paid:</p>
                                    <p className=' my-4 min-w-[275px]'>Units:</p>
                                    <p className=' my-4 min-w-[275px]'>Charge:</p>
                                    <p className=' my-4 min-w-[275px]'>Token:</p>
                                    <p className=' my-4 min-w-[275px]'>Location:</p>
                                    <p className=' my-4 min-w-[275px]'> </p>
                                </div>
                            </div>
                        {currentUsers.length > 0 ? (
                            <div className="">
                                <div className=''>
                                    {currentUsers.map((user, index) => (
                                        <div key={index} onClick={() => handleUserClick(user.email)} style={{ cursor: 'pointer' }}>
                                            <div className='flex'>
                                                <p className='my-4 min-w-[275px]'>{user.email}</p>
                                                <p className='my-4 min-w-[275px]'>{user.phone}</p>
                                                <p className='my-4 min-w-[275px]'>{formatDate(user.date)}</p>
                                                <p className='my-4 min-w-[275px]'>{user.meternumber}</p>
                                                <p className='my-4 min-w-[275px]'>{user.amount}</p>
                                                <p className='my-4 min-w-[275px]'>{user.units}</p>
                                                <p className='my-4 min-w-[275px]'>{user.charge}</p>
                                                <p className='my-4 min-w-[275px]'>{user.token}</p>
                                                <p className='my-4 min-w-[275px]'>{user.location}</p>
                                                <button className='my-4 bg-secondary rounded-lg text-white py-2 px-4 min-w-[200px]'>Re-purchase</button>
                                            </div>
                                            {/* {index !== currentUsers.length - 1 && <hr className='w-full' />} */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className='text-secondary text-center py-5 italic'>User has no history</p>
                        )}
                        </div>
                        

                         {/* Pagination */}
                         <div className='pagination text-center mt-6'>
                            {Array.from({ length: Math.ceil(transaction.length / usersPerPage) }).map((_, index) => (
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

export default TransactionHistory