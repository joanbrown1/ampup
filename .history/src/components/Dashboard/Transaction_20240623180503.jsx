import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import Sidebar from './SideBar';
import Footer from './footer';
import eye from "../../assets/eye.svg";
import ppp from "../../assets/ppp.png";
// import html2canvas from 'html2canvas';

const Transaction = () => {
  const containerRef = useRef(null);
  const containerRef1 = useRef(null);

  const storedUserData = JSON.parse(localStorage.getItem('authUserData'));
  const userData = storedUserData;
  let meterno = userData.meternumber;

  const { ppid } = useParams();
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const getTransactions = async () => {
    setMessage("Searching");

    try {
      let bodyContent = JSON.stringify({ ppid });
      let response = await fetch("https://ampupserver.onrender.com/transactions/ppid", {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json"
        }
      });

      let data = await response.json();

      if (response.status === 200) {
        setTransaction(data);
      } else {
        console.log("Error:", response.status);
      }

      // console.log(data[0])
      let headersList = {
        "api-key": "d8226a375ec6d12593cb3d66862c1475",
        "secret-key": "SK_9274eeaf33dc6e2d580bbba386affbbe3519d6b675a",
        "Content-Type": "application/json"
       }
       
       let body = JSON.stringify({
         "billersCode":data[0].meternumber,
         "serviceID":data[0].location,
         "type":"prepaid"
       });
       
       let res = await fetch("https://api-service.vtpass.com/api/merchant-verify", { 
         method: "POST",
         body: body,
         headers: headersList
       });
       
       let data1 = await res.json();
       console.log(data1);
       setAddress(data1.content.Address || data1.content.District)
       setName(data1.content.Customer_Name)

      setMessage("");
    } catch (error) {
      console.error('Error:', error);
    }

    
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const formatDate = (inputDate) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const generatePDF = async () => {
    if (containerRef.current) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(containerRef.current);
        const pngImage = canvas.toDataURL('image/png');

        if (pngImage.length > 0) {
          const link = document.createElement('a');
          link.href = pngImage;
          link.download = 'transaction_receipt.png';
          link.click();
        } else {
          console.error('Error: Data URL is empty');
        }
      } catch (error) {
        console.error('Error converting HTML to PNG:', error);
      }
    }
  };

  const generatePDF1 = async () => {
    if (containerRef1.current) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(containerRef1.current);
        const pngImage = canvas.toDataURL('image/png');

        if (pngImage.length > 0) {
          const link = document.createElement('a');
          link.href = pngImage;
          link.download = 'transaction_receipt.png';
          link.click();
        } else {
          console.error('Error: Data URL is empty');
        }
      } catch (error) {
        console.error('Error converting HTML to PNG:', error);
      }
    }
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
              <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                <div className='flex'><img src={eye} className='w-[16px]' /><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
              </div>
              {message === "Searching" ? 
              <Alert color="warning" className='w-[989px] my-10'>
                  Searching, this might take a few seconds
              </Alert>: ""
              }
              {transaction.length > 0 && transaction.map((item, index) => (
                <div className=' mt-10' key={index}>
                  <div className='pb-20'>
                    <div className='text-center text-[#808080] w-[989px]' ref={containerRef}>
                      <img src={ppp} alt="Logo"/>
                      <p className='font-bold text-xl mt-[2.5rem] text-black'>Transaction Details</p>
                      <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Name:</p>
                        <p className='ml-auto text-black'>{name || "No name found"}</p>
                      </div>
                      <div className='my-[6px] mx-[10px] flex justify-between'>
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
                        <p>Address:</p>
                        <p className='ml-auto text-black'>{address || "No address found"}</p>
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
                      Print Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-full flex justify-center">
            <div className='my-10'>
              <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                <div className='flex'><img src={eye} className='w-[16px]' /><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
              </div>
              {message === "Searching" ? 
              <Alert color="warning" className='w-[328px] my-10'>
                  Searching, this might take a few seconds
              </Alert>: ""
              }
              {transaction.length > 0 && transaction.map((item, index) => (
                <div className='my-10' key={index}>
                  <div className=''>
                    <div className='text-center text-gray-500 w-[328px]' ref={containerRef1}>
                      <img src={ppp} alt="Logo"/>
                      <p className='font-bold text-xl my-14 text-black'>Transaction Details</p>
                      <div className='my-[6px] mx-[10px] flex justify-between'>
                        <p>Name:</p>
                        <p className='ml-auto text-black'>{name || "No name found"}</p>
                      </div>
                      <div className='my-[6px] mx-[10px] flex justify-between'>
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
                        <p>Address:</p>
                        <p className='ml-auto text-black'>{address || "No address found"}</p>
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
                      onClick={generatePDF1}>
                      Print Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Transaction;
