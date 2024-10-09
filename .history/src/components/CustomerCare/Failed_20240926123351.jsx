import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiOutlineThumbUp } from 'react-icons/hi'
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const Failed = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [trueModal, setTrueModal] = useState(false);
    const [thisUser, setThisUser] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [message, setMessage] = useState("");
    const [powerd, setPowerd] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const vtpassApiKey = "63ba3d3c61422c58f2a4fee1fa157852"
    const vtpassSecretKey = "SK_210c5eb49d231bbd75c8489d7449e8cba7c52fa3b4a"

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const modelOpen = (user) => {
        setOpenModal(true);
        setThisUser(user)
    };


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

    const saveTransaction  = async (powerdata, user)=>{
        

        try {
            
            let body = JSON.stringify({
                "email":user.email,
                "phone":user.phone,
                "meternumber":user.meternumber,
                "amount":user.amount,
                "units":powerdata.units || powerdata.Units || 0,
                "charge":user.charge,
                "token":powerdata.token || powerdata.Token,
                "location":user.location,
                "vtid":powerdata.content.transactions.transactionId,
                "ppid":powerdata.requestId || powerdata.RequestNumber,
                "cost":parseFloat(user.amount),
                "tpl":user.charge,
                "commision":powerdata.content.transactions.commission,
                "discountpercent": 0,
                "discountamount": 0,
                "tpm": 0,

            });
            
            let res = await fetch("https://api.powerkiosk.ng/api/transaction", { 
                method: "POST",
                body: body,
                headers: {
                "Content-Type": "application/json"
                }
            });
            
            let info = await res.text();
            console.log(info);

            getTransactions();
            

        } catch (error) {
            console.log("Error!", error);
        }
    };

    const getCurrentDateTimeCode = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const code = `${year}${month}${day}${hours}${minutes}`;
        return code;
    }

    const todayCode = getCurrentDateTimeCode();

    const Power = async (user) => {
        setMessage("Loading");
        console.log(user)

        let vtamount;

        if (user.amount > 2500) {
            vtamount = user.amount - ((1.5 / 100 * user.amount)  + 100);
        } else {
            vtamount = user.amount - (1.5 / 100 * user.amount);
        }


        try {
            let headersList = {
                "api-key": vtpassApiKey,
                "secret-key": vtpassSecretKey,
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                "request_id": todayCode,
                "serviceID": user.location,
                "billersCode": user.meternumber,
                "variation_code": "prepaid",
                "amount": vtamount,
                "phone": user.phone
            });
    
            let response = await fetch("https://api-service.vtpass.com/api/pay", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
    
            let data = await response.json();
            console.log(data);

            if (data.code == "000"){
                    // Pass data to saveTransaction after a delay
                window.setTimeout(() => {
                    saveTransaction(data, user);
                }, 1000);
                setOpenModal(false);
                setTrueModal(true);
            }else {
                setMessage(error);
            }

            setPowerd(data)

             

            setMessage("");
        } catch (error) {
            console.log("Error!", error);
            setMessage(error);
        }
    };
      
    
  return (
    <>
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
            <div className='lg:col-span-2'>
                <Side/>
            </div>
            <div className='lg:col-span-10'>
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to re-purchase this Transaction?<br/><br/>
                        <div className='text-left font-bold my-4'>
                            Email Address: {thisUser.email}<br/>
                            Meter Number: {thisUser.meter_number}<br/>
                            Meter Type: {thisUser.location}<br/>
                            Amount: {thisUser.amount}
                        </div>
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={()=> Power(thisUser)}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
                <Modal show={trueModal} size="md" onClose={() => setTrueModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                    <div className="text-center">
                        <HiOutlineThumbUp className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Purchase Successful
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="gray" onClick={() => setTrueModal(false)}>
                            Done
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
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
                                        <div key={index} style={{ cursor: 'pointer' }}>
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
                                                <button className='my-4 bg-secondary rounded-lg text-white py-2 px-4 min-w-[150px] font-bold'
                                                onClick={()=>{modelOpen(user)}}>
                                                    Re-purchase
                                                </button>
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

export default Failed