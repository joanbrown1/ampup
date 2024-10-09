import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert } from 'flowbite-react';
import { HiPhone, HiCalculator } from 'react-icons/hi';
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const User = () => {

    // const { userData } = useAuth();;

    const { email } = useParams();
    // console.log(email)

    let navigate = useNavigate();

    const [transaction, setTransaction] = useState([]);
    const [search, setSearch] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [edit, setEdit] = useState(false);
    const [ed, setEd] = useState("");
    const [formData, setFormData] = useState({
        phonenumber: "",
        meternumber: ""
    });
    const [editMessage, setEditmessage] = useState("");

    const adminData = JSON.parse(localStorage.getItem('adminData'));

   

    

    const getTransactions = async () => {
        // e.preventDefault();

        setMessage("Searching")
    
    
        try {
           
           let bodyContent = JSON.stringify({
             "email": email
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
                setTransaction(data);
            } else {
                console.log("Error:", response.status);
                // Handle error condition accordingly
            }

            let res = await fetch("https://api.powerkiosk.ng/api/users/email", { 
             method: "POST",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
             }
           });
           
           let search = await res.json();
        //    console.log(search);

            // Check if the status is 200
            if (res.status === 200) {
                setSearch(search);

                setFormData({
                    phonenumber: search.phonenumber,
                    meternumber: search.meternumber
                  });
            } else {
                console.log("Error:", res.status);
                // Handle error condition accordingly
            }
           
           setMessage("")
         
        } catch (error) {
          console.error('Error:', error);
        }
        
    };
    
    useEffect(() => {
        getTransactions();
      }, []);

     
     
      const handleChange = (event) => {
        const { name, value } = event.target;
        if (value.trim() !== '') {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

      const handleEdit = async (e) => {
        e.preventDefault();
        setEditmessage("Loading")
    
    
        try {
         
           let bodyContent = JSON.stringify({
             "email":email,
             "phonenumber":formData.phonenumber,
             "meternumber":formData.meternumber
           });
           
           let response = await fetch("https://api.powerkiosk.ng/api/update/user", { 
             method: "PUT",
             body: bodyContent,
             headers: {
                "Content-Type": "application/json"
               }
           });
           
           let data = await response.text();
            console.log(data);

           if(response.ok){
            setEditmessage("Done");
            getTransactions();
            setEdit(false);
           }else {
            setEditmessage(data);
           }

        } catch (error) {
          console.error('Error:', error);
          setEditmessage(error)
          setEd("error")
        }
        
      };

      // Calculate index of the first and last user to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = transaction.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Searching" ? 
                        <Alert color="success" className='w-[989px]'>
                            Searching, this might take a few seconds
                        </Alert>: ""
                        }
                        <div className='bg-white rounded-lg p-5 px-10 text-gray-900 text-sm w-[989px]'>
                        <p className='text-lg font-bold text-center my-10'>User Details</p>
                        <div className='grid grid-cols-4 text-black font-base font-semibold'>
                            <p className=' my-4 '>Email:</p>
                            <p className=' my-4 '>Phone Number:</p>
                            <p className=' my-4 '>Meter Number:</p>
                        </div>
                        {search ?
                            (Array.isArray(search) && search.map((item, index) => (
                           <div className=''>
                                
                                <div key={index}>
                                    <div  className='grid grid-cols-4'>
                                        <p className=' my-4 '>{item.email}</p>
                                        <p className=' my-4 '>{item.phonenumber}</p>
                                        <p className=' my-4 '>{item.meternumber}</p>
                                        <p className=' my-4 font-bold underline' onClick={() => setEdit(!edit)} style={{ cursor: 'pointer' }}>Edit User</p>
                                    </div>
                                </div>
                           </div>
                           ))) : 
                           (<p className='text-secondary text-center py-5 italic'>User not found</p>)}
                        </div>
                        { edit ?
                            <div className='border border-secondary rounded-lg p-4 w-[400px] my-10'>
                            <p className='text-center py-2'>Kindly fill user details</p>
                            <div className='flex justify-center items-center'>
                                <form className='mb-4' >
                                    <div className="w-[350px] mt-2">
                                        <div className="relative">
                                            <input
                                            id="phonenumber"
                                            name="phonenumber"
                                            type="text"
                                            placeholder="Phone Number"
                                            value={formData.phonenumber}
                                            onChange={handleChange}
                                            style={{ fontSize: '0.8rem', height: '60px' }}
                                            className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <HiPhone />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[350px] mt-2">
                                        <div className="relative">
                                            <input
                                            id="meternumber"
                                            name="meternumber"
                                            type="text"
                                            placeholder="Meter Number"
                                            value={formData.meternumber}
                                            onChange={handleChange}
                                            style={{ fontSize: '0.8rem', height: '60px' }}
                                            className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <HiCalculator />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => handleEdit(e)}>
                                    Submit
                                    </button>
                                </form>
                                
                            </div>
                                {editMessage === "Loading" ? 
                                <Alert color="warning" className='w-[350px]'>
                                    {editMessage}, this might take a few seconds
                                </Alert>: ""
                                }
                                {editMessage === "Done" ? 
                                <Alert color="success" className='w-[350px]'>
                                    {editMessage}, User updated
                                </Alert>: ""
                                }
                                {ed ? 
                                <Alert color="danger" className='w-[350px]'>
                                    {editMessage}
                                </Alert>: ""
                                }
                        </div> : null}
                        <div className='bg-white rounded-lg p-5 px-10 text-gray-900 text-sm w-[989px] my-10'>
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
                                    <p className=' my-4 min-w-[275px]'>VT Pass ID:</p>
                                    <p className=' my-4 min-w-[275px]'>Profit Plus ID:</p>
                                    <p className=' my-4 min-w-[275px]'>Discount Percent:</p>
                                    <p className=' my-4 min-w-[275px]'>Discount Amount:</p>
                                    <p className=' my-4 min-w-[275px]'>Cost:</p>
                                    <p className=' my-4 min-w-[275px]'>Commisssion Earned:</p>
                                    <p className=' my-4 min-w-[275px]'>Total Profit/Loss:</p>
                                    <p className=' my-4 min-w-[275px]'>Total Profit Margin:</p>
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
                                                <p className='my-4 min-w-[275px]'>{user.vtid}</p>
                                                <p className='my-4 min-w-[275px]'>{user.ppid}</p>
                                                <p className='my-4 min-w-[275px]'>{user.discountpercent}</p>
                                                <p className='my-4 min-w-[275px]'>{user.discountamount}</p>
                                                <p className='my-4 min-w-[275px]'>{user.cost}</p>
                                                <p className='my-4 min-w-[275px]'>{user.commision}</p>
                                                <p className='my-4 min-w-[275px]'>{user.tpl}</p>
                                                <p className='my-4 min-w-[275px]'>{user.tpm}</p>
                                            </div>
                                            <hr className='w-screen'/>
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

export default User