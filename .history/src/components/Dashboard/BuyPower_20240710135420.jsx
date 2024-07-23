import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack'
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import copy from "../../assets/copy.png"
import "./dashboard.css"
import { Alert } from 'flowbite-react';
import PageLoader from '../Home/PageLoader';

const BuyPower = () => {

    const navigate = useNavigate();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let meterno = userData.meternumber;

    const email = userData.email;

    const publicKey = "pk_test_e51a4455891459c394a3c0d3a075fdb239e1f059";

    const [formData, setFormData] = useState({
        location:"",
        type:"",
        meter_number:userData.meternumber,
        request_id:"",
        amount:"",
        phone:userData.phonenumber,
        email:userData.email
    });

      

      const [confirm, setConfirm] = useState(false);

      const [show, setShow] = useState(false);

      const [custumer, setCustumer] = useState("");

      const [data, setData] = useState("");

      const [tokenn, setTokenn] = useState("");

      const [discountCode, setDiscountCode] = useState("");

      const [search, setSearch] = useState("");

      const [discount, setDiscount] = useState({});

      const [charge, setCharge] = useState("");

      const [isChecked, setIsChecked] = useState(false);

      const [meterNumber, setMeterNumber] = useState([]);

      const [newMeter, setNewMeter] = useState(false);



      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };

    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const getCharges = async () => {
    
        try {
           
           let response = await fetch("https://ampupserver.onrender.com/charges", { 
             method: "GET",
             headers: {
                "Accept": "*/*"
             }
           });
           
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                setCharge(data[0].charge);
            } else {
                console.log("Error:", response.status);
                // Handle error condition accordingly
            }

        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    const getMeterNumbers = async () => {
    
        try {
           
            let bodyContent = JSON.stringify({
                "email":email
              });
              
              let response = await fetch("https://ampupserver.onrender.com/meters/email", { 
                method: "POST",
                body: bodyContent,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
              });
          
           let data = await response.json();
        //    console.log(data);

            // Check if the status is 200
            if (response.status === 200) {
                const meterNumbers = data.map(item => item.meter);
                setMeterNumber(meterNumbers);
            } else {
                console.log("Error:", response.status, data);
                // Handle error condition accordingly
            }

        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    useEffect(() => {
        getCharges();
        getMeterNumbers();
      }, []);

      

      const checkMeter = async (e) =>{
        e.preventDefault();

        if (isChecked) {
            try {
         
                let bodyContent = JSON.stringify({
                  "email":email,
                  "meternumber":formData.meter_number
                });
                
                let response = await fetch("https://ampupserver.onrender.com/update/user", { 
                  method: "PUT",
                  body: bodyContent,
                  headers: {
                     "Content-Type": "application/json"
                    }
                });
                
                let data = await response.text();
                 console.log(data);
     
             } catch (error) {
               console.error('Error:', error);
             }
        }

        try {
            let headersList = {
                "api-key": "d8226a375ec6d12593cb3d66862c1475",
                "secret-key": "SK_9274eeaf33dc6e2d580bbba386affbbe3519d6b675a",
                "Content-Type": "application/json"
               }
               
               let bodyContent = JSON.stringify({
                 "billersCode":formData.meter_number,
                 "serviceID":formData.location,
                 "type":formData.type
               });
               
               let response = await fetch("https://api-service.vtpass.com/api/merchant-verify", { 
                 method: "POST",
                 body: bodyContent,
                 headers: headersList
               });
               
               let data = await response.json();
            //    console.log(data);
               setCustumer(data.content);
               
               
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

    

    const Power = async () => {
        try {
            let headersList = {
                "api-key": "d8226a375ec6d12593cb3d66862c1475",
                "secret-key": "SK_9274eeaf33dc6e2d580bbba386affbbe3519d6b675a",
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                "request_id": todayCode,
                "serviceID": formData.location,
                "billersCode": formData.meter_number,
                "variation_code": formData.type,
                "amount": formData.amount,
                "phone": formData.phone
            });
    
            let response = await fetch("https://api-service.vtpass.com/api/pay", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
    
            let data = await response.json();
            console.log(data.token);
    
            // Check if data contains required fields
             // Pass data to saveTransaction after a delay
             window.setTimeout(() => {
                saveTransaction(data);
            }, 1000);
        } catch (error) {
            console.log("Error!", error);
        }
    };
    
    
    
   
    
    const paymentDone = () => {
        // console.log("done");
        Power();
    };
    
    const checkDiscount = async (e) => {
        e.preventDefault

        setSearch("Loading")
    
    
        try {
           
           let bodyContent = JSON.stringify({
             "code": discountCode
           });

            let res = await fetch("https://ampupserver.onrender.com/discounts/code", { 
             method: "POST",
             body: bodyContent,
             headers: {
              "Content-Type": "application/json"
             }
           });
           
           let data = await res.json();
           console.log(data);

            // Check if the status is 200
            if (res.ok) {
                setDiscount(data[0]);
                console.log(data[0].amount)

            } else {
                console.log("Error:", res.status);
                setSearch(res.status)
                // Handle error condition accordingly
            }
           
           setSearch("")
         
        } catch (error) {
          console.error('Error:', error);
          setSearch(error);
        }
    };

    
    const saveTransaction  = async (powerdata)=>{
        
        console.log(powerdata.content.transactions.commission)
        

        try {
            
            let body = JSON.stringify({
                "email":email,
                "phone":formData.phone,
                "meternumber":formData.meter_number,
                "amount":amount,
                "units":powerdata.units || powerdata.Units || 0,
                "charge":charge,
                "token":powerdata.token || powerdata.Token,
                "location":formData.location,
                "vtid":powerdata.content.transactions.transactionId,
                "ppid":powerdata.requestId || powerdata.RequestNumber,
                "cost":parseFloat(formData.amount),
                "tpl":tpl,
                "commision":powerdata.content.transactions.commission,
                "discountpercent": discount.percent || 0,
                "discountamount": discount.amount || 0,
                "tpm": tpm,

            });
            
            let res = await fetch("https://ampupserver.onrender.com/transaction", { 
                method: "POST",
                body: body,
                headers: {
                "Content-Type": "application/json"
                }
            });
            
            let info = await res.text();
            console.log(info);

            setData(JSON.parse(body))

            setTokenn(powerdata.token || powerdata.Token);
            

        } catch (error) {
            console.log("Error!", error);
        }
    };


    //Financial Calculations
    let amount;

    if (discount && (discount.amount > 0 || discount.percent > 0)) {
        // Apply both fixed amount and percentage discount
        const originalAmount = parseFloat(formData.amount) + parseFloat(charge); // Original amount without discount
    
        let discountedAmount = originalAmount; // Initialize discounted amount with original amount
    
        // Subtract fixed discount amount
        discountedAmount -= discount.amount;
    
        // Subtract discount based on percentage
        discountedAmount -= (originalAmount * (discount.percent / 100));
    
        // Ensure the discounted amount doesn't go below zero
        discountedAmount = Math.max(discountedAmount, 0);
    
        amount = discountedAmount;
    } else {
        // Keep the original amount if no discount is applied
        amount = parseFloat(formData.amount) + parseFloat(charge);
    }

    const displayAmount = `₦${amount.toFixed(2)}`; // Format the amount with 2 decimal places

    const pl = amount - parseFloat(formData.amount);

    const tpl = data.content ? parseFloat(data.content.transactions.commission) + pl : pl;
    const tpm = (tpl / amount) * 100;

    // const ce = data.content ? parseFloat(data.content.transactions.commission) : 0;




    const handleHistory = (e) => {
        e.preventDefault();
        saveTransaction();
    };

    

    const componentProps = {
        email,
        amount: amount * 100, // Convert amount to kobo
        publicKey,
        text: 'Buy Now',
        onSuccess: ({ reference }) => {
            alert(`Your purchase was successful! Transaction reference: ${reference}`);
            paymentDone();
        },
        onClose: () => alert("Wait! Are you sure you want to cancel?"),
    };
    
    const handleCopyToken = () => {
        const token = data.token || data.Token;
        if (token) {
          navigator.clipboard.writeText(token)
            .then(() => {
              alert('Token copied to clipboard!');
            })
            .catch(err => {
              console.error('Failed to copy token: ', err);
            });
        }
      };

      const handleShare = () => {
        if (tokenn) {
            if (navigator.share) {
                // Use Web Share API if supported
                navigator.share({
                  title: 'Share site',
                  text: `Token : ${tokenn} Recharge your electric meter with ease here! https://powerkiosk.ng`,
                  // url: 'https://powerkiosk.ng',
                }).then(() => {
                  console.log('Successfully shared');
                }).catch(error => {
                  console.error('Error sharing:', error);
                  // Fallback for errors (optional)
                  alert('Error sharing content. Please try again.');
                });
              } else {
                // Fallback for browsers that do not support Web Share API
                const title = 'Share site';
                const text = `Token : ${tokenn} Recharge your electric meter with ease here! https://powerkiosk.ng`;
                // const url = 'https://powerkiosk.ng';
              
                // Combine the title, text, and URL into the WhatsApp message
                const message = `${title}\n${text}\n${url}`;
                const encodedMessage = encodeURIComponent(message);
              
                // Check if the device is mobile
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
                if (isMobile) {
                  // Use WhatsApp deep link for mobile devices
                  window.location.href = `whatsapp://send?text=${encodedMessage}`;
                } else {
                  // Use WhatsApp Web URL scheme for desktop
                  window.location.href = `https://web.whatsapp.com/send?text=${encodedMessage}`;
                }
              }
        } else {
            if (navigator.share) {
                // Use Web Share API if supported
                navigator.share({
                  title: 'Share site',
                  text: 'Recharge your electric meter with ease here! https://powerkiosk.ng',
                  // url: 'https://powerkiosk.ng',
                }).then(() => {
                  console.log('Successfully shared');
                }).catch(error => {
                  console.error('Error sharing:', error);
                  // Fallback for errors (optional)
                  alert('Error sharing content. Please try again.');
                });
              } else {
                // Fallback for browsers that do not support Web Share API
                const title = 'Share site';
                const text = 'Recharge your electric meter with ease here! https://powerkiosk.ng';
                // const url = 'https://powerkiosk.ng';
              
                // Combine the title, text, and URL into the WhatsApp message
                const message = `${title}\n${text}\n${url}`;
                const encodedMessage = encodeURIComponent(message);
              
                // Check if the device is mobile
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
                if (isMobile) {
                  // Use WhatsApp deep link for mobile devices
                  window.location.href = `whatsapp://send?text=${encodedMessage}`;
                } else {
                  // Use WhatsApp Web URL scheme for desktop
                  window.location.href = `https://web.whatsapp.com/send?text=${encodedMessage}`;
                }
              }
        }
      };
    

  return (
    <>
    {
        search && search === "Loading" ?
        <div className='items-center justify-center flex h-[650px] lg:h-[300px]'>
            <PageLoader/>
        </div> :
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
        <div className='lg:col-span-2'>
            <Sidebar/>
        </div>
        <div className='lg:col-span-10'>
            <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                <div className='ml-6'>
                    <p className='text-lg font-medium mb-4'>Buy Electricity</p>
                    <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                        <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                        <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                    </div>
                    <div className='ml-[300px] mt-10'>
                        {
                            data ?
                            <>
                            <div className='flex border-2 border-green-300 bg-green-200 p-5 w-[400px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                                <p className='text-lg'>Token: {data.token || data.Token}</p>
                                <img src={copy} alt='copy' className='w-5 h-5 mt-1 ml-3 cursor-pointer' onClick={handleCopyToken}/>
                            </div>
                            <div onClick={handleShare}>
                                <p className='text-seconday cursor-pointer italic underline' >Share Token with your contact.</p>
                            </div>
                            <button className='mb-5 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/dashboard")}>
                            Go Back
                            </button>
                            </> : 

                            <>
                            {
                            show ?
                            <>
                            <div className=' text-gray-700'>
                                <p className='text-lg font-bold my-10 pl-[120px] text-black'>Confirm Order</p>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Customer Name:</p>
                                    <p className='ml-auto text-black'>{custumer.Customer_Name}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Meter Number: </p>
                                    <p className='ml-auto text-black'>{formData.meter_number}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Location: </p>
                                    <p className='ml-auto text-black'>{formData.location}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Meter Type: </p>
                                    <p className='ml-auto text-black'>{formData.type}</p>
                                </div>
                                <hr className='w-[350px] my-4'/>
                                <p className='font-semibold my-4'>Have a discount?</p>
                                <div className="w-[350px] mt-2">
                                    <div className="relative">
                                        <input
                                            id="discountcode"
                                            name="discountcode"
                                            type="type"
                                            placeholder="Discount Code"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)} // Corrected onChange function
                                            style={{ fontSize: '0.8rem', height: '60px' }}
                                            className="py-2 pl-3 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                        />
                                        <div className=" cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-[#7B0323] text-lg" onClick={(e) => checkDiscount(e)}>
                                            <p>Apply</p>
                                        </div>
                                    </div>
                                </div>
                                {search && search !== "Loading" ? 
                                <Alert color="failure" className='my-2 w-[350px]'>
                                    Not an active discount code!
                                </Alert>: ""
                                }
                                <hr className='w-[350px] my-4'/>
                                <p className='text-black text-lg my-2'>Payment Breakdown</p>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Vend Amount: </p>
                                    <p className='ml-auto text-black'>{displayAmount}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Initial Vend Amount: </p>
                                    <p className='ml-auto text-black'>{displayAmount}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Service Charge: </p>
                                    <p className='ml-auto text-black'>₦{charge}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Gateway Charge: </p>
                                    <p className='ml-auto text-black'>₦0.00</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Discount Amount: </p>
                                    <p className='ml-auto text-black'>{discount && discount.amount > 0 ? `₦${discount.amount}` : "₦0.00"} </p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Discount Percentage: </p>
                                    <p className='ml-auto text-black'>{discount && discount.percent > 0 ? `${discount.percent}%` : "0%"} </p>
                                </div>
                                <hr className='w-[350px] my-8'/>
                                <p className='text-lg'>Total:</p>
                                <p className='text-lg mb-4 text-secondary'>{displayAmount}</p>
                            </div>
                            {/* <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => Power(e)}>
                            Buy
                            </button> */}
                            <PaystackButton className="paystack-button w-[350px] h-[60px]" {...componentProps} />
                            </> :
                            <>
                            <form className='mb-4' >
                        <p className='font-semibold text-gray-700 my-4'>Location:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <select name="location" value={formData.location} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="ikeja-electric">IKEDC - Ikeja Electric </option>
                                    <option value="eko-electric">EKEDC - Eko Electric</option>
                                    <option value="kano-electric">KEDCO - Kano Electric</option>
                                    <option value="portharcourt-electric">PHEN - Port Harcourt Electric</option>
                                    <option value="jos-electric">JED - Jos Electric</option>
                                    <option value="ibadan-electric">IBEDC - Ibadan Electric</option>
                                    <option value="kaduna-electric">KAEDCO - Kaduna Electric</option>
                                    <option value="abuja-electric">AEDC - Abuja Electric</option>
                                    <option value="enugu-electric">EEDC - Enugu Electric</option>
                                    <option value="benin-electric">BEDC - Benin Electric</option>
                                    <option value="aba-electric">ABA - Aba Electric</option>
                                    <option value="yola-electric">YEDC - Yola Electric</option>
                                </select>
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-4'>Type of Meter:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <select name="type" value={formData.type} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="prepaid">Pre-paid</option>
                                    <option value="postpaid">Post-paid</option>
                                </select>
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-4'>Meter Number:</p>
                        {newMeter ? (
                            <div className="w-[350px] mt-2">
                                <div className="relative">
                                    <input
                                        id="meter_number"
                                        name="meter_number"
                                        type="text"
                                        placeholder="37740846208442957296"
                                        value={formData.meter_number}
                                        onChange={handleChange}
                                        style={{ fontSize: '1rem', height: '70px' }}
                                        className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='w-[350px]'>
                                <div className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}>
                                    <div className=" mt-2">
                                        <div className="relative">
                                            <select
                                                id="meter_number"
                                                name="meter_number"
                                                value={formData.meter_number}
                                                onChange={handleChange}
                                                style={{ fontSize: '1rem', height: '50px' }}
                                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                            >
                                                {meterNumber.map((number) => (
                                                    <option key={number} value={number}>
                                                        {number}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <p className='pt-2 font-mono font-bold border-2 rounded-lg text-center px-2 ml-2 h-[50px] text-secondary mt-2 cursor-pointer border-gray-300' onClick={() => setNewMeter(true)}>Add new Meter</p>
                                </div>
                            </div>
                        )}

                        
                        <p className='font-semibold text-gray-700 my-4'>Amount:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="2000"
                                value={formData.amount}
                                onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div>
                        
                        <div className='w-[350px] mt-5'>
                            <div className='relative flex'>
                                <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                />
                                <p className=' ml-4 mt-[-4px] italic'>Would you like to save this Meter Number?</p>
                            </div>

                        </div>
                        
                        {custumer && !confirm ?
                        <>
                        <div className='bg-gray-100 italic text-lg mt-2 text-black'>
                            <p>Please confirm  your customer details to proceed.</p>
                            <p>Name: {custumer.Customer_Name}</p>
                        </div>
                        <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setShow(true)}>
                        Confirm
                        </button>
                        </>:''}
                        {!custumer && !confirm ?
                        <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => checkMeter(e)}>
                        Buy Power
                        </button>:""}
                    </form>
                            </>
                        }


                            </>
                        }
                        
                    </div>
                </div>
            </div>
            <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-full flex justify-center ">
                <div className='my-10 pb-10'>
                    <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                        <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                        <p className='text-white text-2xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                    </div>
                    {
                            data ?
                            <>
                            <div className='flex border-2 border-green-300 bg-green-200 p-5 w-[350px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                                <p className='text-lg'>Token: {data.token || data.Token}</p>
                                <img src={copy} alt='copy' className='w-5 h-5 mt-1 ml-3 cursor-pointer' onClick={handleCopyToken}/>
                            </div>
                            <div onClick={handleShare}>
                                <p className='text-seconday cursor-pointer italic underline' >Share Token with your contact.</p>
                            </div>
                            <button className='mb-5 bg-[#7B0323] w-[328px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/dashboard")}>
                            Go Back
                            </button>
                            </> : 

                            <>
                            {
                        show ?
                        <>
                            <div className=' text-gray-700'>
                                <p className='text-lg font-bold my-10 pl-[120px] text-black'>Confirm Order</p>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Customer Name:</p>
                                    <p className='ml-auto text-black'>{custumer.Customer_Name}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Meter Number: </p>
                                    <p className='ml-auto text-black'>{formData.meter_number}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Location: </p>
                                    <p className='ml-auto text-black'>{formData.location}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Meter Type: </p>
                                    <p className='ml-auto text-black'>{formData.type}</p>
                                </div>
                                <hr className='w-[350px] my-4'/>
                                <p className='font-semibold my-4'>Have a discount?</p>
                                <div className="w-[350px] mt-2">
                                    <div className="relative">
                                        <input
                                            id="discountcode"
                                            name="discountcode"
                                            type="type"
                                            placeholder="Discount Code"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)} // Corrected onChange function
                                            style={{ fontSize: '0.8rem', height: '60px' }}
                                            className="py-2 pl-3 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                        />
                                        <div className=" cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-[#7B0323] text-lg" onClick={(e) => checkDiscount(e)}>
                                            <p>Apply</p>
                                        </div>
                                    </div>
                                </div>
                                {search && search !== "Loading" ? 
                                <Alert color="failure" className='my-2 w-[350px]'>
                                    Not an active discount code!
                                </Alert>: ""
                                }
                                <hr className='w-[350px] my-4'/>
                                <p className='text-black text-lg my-2'>Payment Breakdown</p>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Vend Amount: </p>
                                    <p className='ml-auto text-black'>{displayAmount}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Initial Vend Amount: </p>
                                    <p className='ml-auto text-black'>{displayAmount}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Service Charge: </p>
                                    <p className='ml-auto text-black'>₦{charge}</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Gateway Charge: </p>
                                    <p className='ml-auto text-black'>₦0.00</p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Discount Amount: </p>
                                    <p className='ml-auto text-black'>{discount && discount.amount > 0 ? `₦${discount.amount}` : "₦0.00"} </p>
                                </div>
                                <div className='flex w-[350px] justify-between my-2'>
                                    <p>Discount Percentage: </p>
                                    <p className='ml-auto text-black'>{discount && discount.percent > 0 ? `${discount.percent}%` : "0%"} </p>
                                </div>
                                <hr className='w-[350px] my-8'/>
                                <p className='text-lg'>Total:</p>
                                <p className='text-lg mb-4 text-secondary'>{displayAmount}</p>
                            </div>
                            {/* <button className='mb-20 bg-[#7B0323] w-[328px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => Power(e)}>
                            Buy
                            </button> */}
                            <PaystackButton className="paystack-button w-[350px] h-[60px] mb-10" {...componentProps} />
                        </> :
                        <>
                        <form className='mb-4 mt-14'>
                        <p className='font-semibold text-gray-700 my-4'>Location:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <select name="location" value={formData.location} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="ikeja-electric">IKEDC - Ikeja Electric </option>
                                    <option value="eko-electric">EKEDC - Eko Electric</option>
                                    <option value="kano-electric">KEDCO - Kano Electric</option>
                                    <option value="portharcourt-electric">PHEN - Port Harcourt Electric</option>
                                    <option value="jos-electric">JED - Jos Electric</option>
                                    <option value="ibadan-electric">IBEDC - Ibadan Electric</option>
                                    <option value="kaduna-electric">KAEDCO - Kaduna Electric</option>
                                    <option value="abuja-electric">AEDC - Abuja Electric</option>
                                    <option value="enugu-electric">EEDC - Enugu Electric</option>
                                    <option value="benin-electric">BEDC - Benin Electric</option>
                                    <option value="aba-electric">ABA - Aba Electric</option>
                                    <option value="yola-electric">YEDC - Yola Electric</option>
                                </select>
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-4'>Type of Meter:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <select name="type" value={formData.type} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="prepaid">Pre-paid</option>
                                    <option value="postpaid">Post-paid</option>
                                </select>
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-4'>Meter Number:</p>
                        { newMeter ?
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <input
                                id="meter_number"
                                name="meter_number"
                                type="text"
                                placeholder="37740846208442957296"
                                value={formData.meter_number}
                                onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div> : 
                         <div className='w-[350px] mt-2' >
                            <div className="py-2 pl-5 pr-3 w-full bg-white border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323] flex">
                                <p className='pt-2'>{formData.meter_number}</p>
                                <div className="border-l border-gray-300 h-12 mx-4"></div>
                                <p className='font-mono text-lg text-secondary mt-2 cursor-pointer' onClick={() => setNewMeter(true)}>Add new Meter</p>
                            </div>
                        </div>
                        }
                        <p className='font-semibold text-gray-700 my-4'>Amount:</p>
                        <div className="w-[350px] mt-2">
                            <div className="relative">
                                <input
                                id="amount"
                                name="amount"
                                type="text"
                                placeholder="2000"
                                value={formData.amount}
                                onChange={handleChange}
                                style={{ fontSize: '1rem', height: '70px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div>
                        <div className='w-[350px] mt-5'>
                            <div className='relative flex'>
                                <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                />
                                <p className=' ml-4 mt-[-4px] italic'>Would you like to save this Meter Number?</p>
                            </div>

                        </div>
                        {custumer && !confirm ?
                        <>
                        <div className='bg-gray-100 italic text-lg mt-2 text-black'>
                            <p>Please confirm  your customer details to proceed.</p>
                            <p>Name: {custumer.Customer_Name}</p>
                        </div>
                        <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setShow(true)}>
                        Confirm
                        </button>
                        </>:''}
                        {!custumer && !confirm ?
                        <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-20 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => checkMeter(e)}>
                        Buy Power
                        </button>:""}
                        </form>
                        </>
                    }


                            </>
                        }
                    
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    }
        
    </>
  )
}

export default BuyPower