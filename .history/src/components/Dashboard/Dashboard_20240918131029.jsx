import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import powerb from "../../assets/powerb.svg"
import usage from "../../assets/usage.svg"
import daily from "../../assets/Daily.svg"
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const Dashboard = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [transaction, setTransaction] = useState([]);

    let meterno = userData.meternumber

    const getTransactions = async () => {
        // event.preventDefault();
    
    
        try {
           
           let bodyContent = JSON.stringify({
             "email":userData.email
           });
           
           let response = await fetch("https://api.powerkiosk.ng/api/transactions/email", { 
             method: "POST",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
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
           
           
         
        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    useEffect(() => {
        getTransactions();
      }, []);

    const formatDate = (inputDate) => {
    // console.log('Input Date:', inputDate);
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
    };

    const handleDetails = (ppid) => {
        navigate('/transaction/'+ ppid);
    };

      
    
  return (
    <>
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
        <div className='lg:col-span-2'>
            <Sidebar/>
        </div>
        <div className='lg:col-span-10'>
            <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Dashboard</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 mt-6 ">
                            <div>
                                {transaction ?
                                (transaction.map((item, index) => (
                                <div className=' p-[10px] w-full bg-white rounded-lg mt-8 mb-4 cursor-pointer' key={index}
                                onClick={() => handleDetails(item.ppid)}>
                                    <div className='rounded-lg text-left p-2 flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div className='ml-2'>
                                            <p className='pl-1 text-sm'>Power Usage</p>
                                            <p className='pl-1 text-xs font-thin'>{formatDate(item.date)}</p>
                                        </div>
                                        <div className='ml-6'>
                                            <p className=' rounded-lg text-sm'>{item.token}</p>
                                            <p className='bg-white rounded-lg text-green-500'>+ ₦{item.amount}</p>
                                        </div>
                                        <div>
                                            <button className='underline-offset-2 underline p-2 text-secondary ml-4' >View Details</button>
                                        </div>
                                    </div>
                                </div>))) : "No Transactions Yet"}
                           
                               
                            </div>
                            {/* <div className='ml-[-120px]'>
                            <p className='text-xl font-bold pb-2'>Power Usage</p>
                            <p className='text-sm pb-4'>Find your power consumption stats here</p>
                            <img src={daily} className='w-[329px] pb-4'/>
                            <img src={usage} className='w-[345px] ml-[-16px]'/>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-full flex justify-center">
                    <div className='my-10 pb-20'>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        {transaction ?
                            (transaction.map((item, index) => (
                                <div className=' p-[10px]  bg-white rounded-lg mt-8 mb-4' key={index}
                                onClick={() => handleDetails(item.ppid)}>
                                <div className='rounded-lg text-left p-2 flex'>
                                    <img src={powerb} className='rounded-lg'/>
                                    <div className='ml-2'>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-1 text-xs font-thin'>{formatDate(item.date)}</p>
                                    </div>
                                    <div className='ml-4'>
                                        <p className=' rounded-lg text-sm'>{item.token}</p>
                                        <p className='bg-white rounded-lg text-green-500'>+ ₦{item.amount}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className='underline-offset-2 underline p-2 text-secondary' >View Details</button>
                                </div>
                            </div>))) : "No Transactions Yet"}

                         
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Dashboard