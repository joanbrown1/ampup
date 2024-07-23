import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'flowbite-react';
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import ppp from "../../assets/ppp.png"
import html2canvas from 'html2canvas';


const Transaction = () => {

  const containerRef = useRef(null);

  const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

  const userData = storedUserData;

  let meterno = userData.meternumber

  const { ppid } = useParams();

  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [pdf, setPdf] = useState(false);

  const getTransactions = async () => {
    // e.preventDefault();

    setMessage("Searching")


    try {
       
       let bodyContent = JSON.stringify({
         "ppid": ppid
       });
       
       let response = await fetch("https://ampupserver.onrender.com/transactions/ppid", { 
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
        }
       
       setMessage("")
     
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

  const generatePDF = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current)
        .then((canvas) => {
          const pngImage = canvas.toDataURL('image/png');

          // Create an anchor tag
          const link = document.createElement('a');
          link.href = pngImage;
          link.download = 'transaction_receipt.png'; // Set the download attribute

          // Simulate a click to trigger the download
          link.click();
        })
        .catch((error) => {
          console.error('Error converting HTML to PNG:', error);
        });
    }
  };
  




  return (
    <>
    <div className='mb-[30px]'>
      <Sidebar/>
      <div>
        <div className="sm:block hidden bg-[#F3F3F3] pt-10 ml-[223px] w-full h-full">
          <div className=' ml-6'>
            <p className='text-lg font-medium mb-4'>Dashboard</p>
            <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
            </div>
            {message === "Searching" ? 
            <Alert color="warning" className='w-[989px] my-10'>
                Searching, this might take a few seconds
            </Alert>: ""
            }
            {transaction ?
            (transaction.map((item, index) => (
              <div className=' mt-10'>
                <div key={index} className='pb-20'>
                <div className='text-center text-[#808080] w-[989px]'  ref={containerRef}>
                    <img src={ppp}/>
                    <p className='font-bold text-xl mt-[2.5rem] text-black'>Transaction Details</p>
                    <div className='my-[6px] mx-[10px] flex justify-between' >
                        <p>Email:</p>
                        <p className='ml-auto text-black'>{item.email}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Meter Number:</p>
                        <p className='ml-auto text-black'>{item.meternumber}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Reference Number:</p>
                        <p className='ml-auto text-black'>{item.ppid}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Paid At:</p>
                        <p className='ml-auto text-black'>{item.date}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Location:</p>
                        <p className='ml-auto text-black'>{item.location}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Token:</p>
                        <p className='ml-auto text-black'>{item.token}</p>
                    </div>
                    <hr />
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Service Charge:</p>
                        <p className='ml-auto text-black'>₦{item.charge}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Discount Amount:</p>
                        <p className='ml-auto text-black'>₦{item.discountamount}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Discount Percentage:</p>
                        <p className='ml-auto text-black'>{item.discountpercent}%</p>
                    </div>
                    <div>
                        <p className='text-center text-xl font-bold mt-[0.5rem]'>Total Amount Paid:</p>
                        <p className='text-secondary text-center text-lg pb-[2.5rem] italic font-bold'>₦{item.amount}</p>
                    </div>
                    
                </div>
                <button className='border-secondary rounded-lg border text-secondary h-[50px] px-4 ml-20 hover:border-black hover:text-black mt-4'
                  onClick={generatePDF}>
                    Print Reciept
                  </button>
                </div>
              </div>
            ))) :""}
          </div>
        </div>
        <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-full flex justify-center">
          <div className='my-10 '>
            <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
            </div>
            {message === "Searching" ? 
            <Alert color="warning" className='w-[328px] my-10'>
                Searching, this might take a few seconds
            </Alert>: ""
            }
            {transaction ?
            (transaction.map((item, index) => (
              <div className='my-10'>
                <div key={index} className=''>
                <div className='text-center text-gray-500 w-[328px]'  ref={containerRef}>
                    <img src={ppp}/>
                    <p className='font-bold text-xl my-14 text-black'>Transaction Details</p>
                    <div className='my-[6px] mx-[10px] flex justify-between' >
                        <p>Email:</p>
                        <p className='ml-auto text-black'>{item.email}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Meter Number:</p>
                        <p className='ml-auto text-black'>{item.meternumber}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Reference Number:</p>
                        <p className='ml-auto text-black'>{item.ppid}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Paid At:</p>
                        <p className='ml-auto text-black'>{item.date}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Location:</p>
                        <p className='ml-auto text-black'>{item.location}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Token:</p>
                        <p className='ml-auto text-black'>{item.token}</p>
                    </div>
                    <hr />
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Service Charge:</p>
                        <p className='ml-auto text-black'>₦{item.charge}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Discount Amount:</p>
                        <p className='ml-auto text-black'>₦{item.discountamount}</p>
                    </div>
                    <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Discount Percentage:</p>
                        <p className='ml-auto text-black'>{item.discountpercent}%</p>
                    </div>
                    <div>
                        <p className='text-center text-xl font-bold mt-[0.5rem]'>Total Amount Paid:</p>
                        <p className='text-secondary text-center text-lg pb-[2.5rem] italic font-bold'>₦{item.amount}</p>
                    </div>
                    
                </div>
                <button className='border-secondary rounded-lg border text-secondary h-[50px] px-4 hover:border-black hover:text-black mt-4'
                  onClick={generatePDF}>
                    Print Reciept
                  </button>
                </div>
              </div>
            ))) :""}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Transaction