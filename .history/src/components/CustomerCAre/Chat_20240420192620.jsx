import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import eye from "../../assets/eye.svg"
import powerb from "../../assets/powerb.svg"
import usage from "../../assets/usage.svg"
import daily from "../../assets/Daily.svg"
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const Chat = () => {

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
           
           let response = await fetch("https://ampupserver.onrender.com/transactions/email", { 
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
                setTransaction(data);
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
      
    
  return (
    <>
        <div className=''>
            <Side/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 ml-[223px] w-full h-full">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 mt-6 ">
                            <div>
                                {transaction ?
                                (transaction.map((item, index) => (
                                <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' key={index}>
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-1 text-xs font-thin'>{formatDate(item.date)}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg w-[180px] h-[44px] text-center pt-2 text-green-500'>+ ₦{item.amount}</div>
                                </div>))) : "No Transactions Yet"}
                                {/* <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' >
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-1 text-xs font-thin'>Monday, March 15th</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg h-[44px] text-center pt-2 text-green-500'>
                                        <p>+ 20 units</p>
                                        <p className='text-black text-xs'>3000 Naira</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' >
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg h-[44px] text-center pt-2 text-green-500'>
                                        <p>+ 20 units</p>
                                        <p className='text-black text-xs'>3000 Naira</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' >
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg h-[44px] text-center pt-2 text-green-500'>
                                        <p>+ 20 units</p>
                                        <p className='text-black text-xs'>3000 Naira</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' >
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg h-[44px] text-center pt-2 text-green-500'>
                                        <p>+ 20 units</p>
                                        <p className='text-black text-xs'>3000 Naira</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 py-[9px] px-[16px] bg-white w-[420px] h-[64px] rounded-lg mt-8' >
                                    <div className='rounded-lg h-[44px] text-center pt-2 ml-2 font-semibold flex'>
                                        <img src={powerb} className='rounded-lg'/>
                                        <div>
                                        <p className='pl-1 text-sm'>Power Usage</p>
                                        <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg h-[44px] text-center pt-2 text-green-500'>
                                        <p>+ 20 units</p>
                                        <p className='text-black text-xs'>3000 Naira</p>
                                    </div>
                                </div> */}
                            </div>
                            <div className='ml-[-120px]'>
                            <p className='text-xl font-bold pb-2'>Power Usage</p>
                            <p className='text-sm pb-4'>Find your power consumption stats here</p>
                            <img src={daily} className='w-[329px] pb-4'/>
                            <img src={usage} className='w-[345px] ml-[-16px]'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center">
                    <div className='my-10 '>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        {transaction ?
                            (transaction.map((item, index) => (
                            <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' key={index}>
                                <div className='rounded-lg h-[32px] text-center pt-2 ml-2 font-semibold flex'>
                                    <img src={powerb} className='rounded-lg'/>
                                    <div>
                                    <p className='pl-1 text-sm'>Power Usage</p>
                                    <p className='pl-1 text-xs font-thin'>{formatDate(item.date)}</p>
                                    </div>
                                </div>
                                <div className='bg-white rounded-lg h-[32px] text-center pt-1 text-green-500'>+ ₦{item.amount}</div>
                            </div>))) : "No Transactions Yet"}
                        {/* <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' >
                            <div className='rounded-lg  h-[32px] text-center pt-1 ml-2 font-semibold flex'>
                                <img src={powerb} className='rounded-lg'/>
                                <div>
                                <p className='pl-1 text-sm'>Power Usage</p>
                                <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg  h-[32px] text-center pt-1 text-green-400' >
                                <p>+ 20 units</p>
                                <p className='text-black text-xs'>3000 Naira</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' >
                            <div className='rounded-lg  h-[32px] text-center pt-1 ml-2 font-semibold flex'>
                                <img src={powerb} className='rounded-lg'/>
                                <div>
                                <p className='pl-1 text-sm'>Power Usage</p>
                                <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg  h-[32px] text-center pt-1 text-green-400' >
                                <p>+ 20 units</p>
                                <p className='text-black text-xs'>3000 Naira</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' >
                            <div className='rounded-lg  h-[32px] text-center pt-1 ml-2 font-semibold flex'>
                                <img src={powerb} className='rounded-lg'/>
                                <div>
                                <p className='pl-1 text-sm'>Power Usage</p>
                                <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg  h-[32px] text-center pt-1 text-green-400' >
                                <p>+ 20 units</p>
                                <p className='text-black text-xs'>3000 Naira</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' >
                            <div className='rounded-lg  h-[32px] text-center pt-1 ml-2 font-semibold flex'>
                                <img src={powerb} className='rounded-lg'/>
                                <div>
                                <p className='pl-1 text-sm'>Power Usage</p>
                                <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg  h-[32px] text-center pt-1 text-green-400' >
                                <p>+ 20 units</p>
                                <p className='text-black text-xs'>3000 Naira</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 pt-[18px] px-[16px] bg-white w-[328px] h-[70px] rounded-lg mt-8 mb-4' >
                            <div className='rounded-lg  h-[32px] text-center pt-1 ml-2 font-semibold flex'>
                                <img src={powerb} className='rounded-lg'/>
                                <div>
                                <p className='pl-1 text-sm'>Power Usage</p>
                                <p className='pl-2 text-xs font-thin '>Monday, March 15th</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg  h-[32px] text-center pt-1 text-green-400' >
                                <p>+ 20 units</p>
                                <p className='text-black text-xs'>3000 Naira</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <Foot/>
        </div>
    </>
  )
}

export default Chat