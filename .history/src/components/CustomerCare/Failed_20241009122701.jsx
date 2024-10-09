import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Side from './Side'
import Foot from './Foot'
import powerb from "../../assets/powerb.svg"
import { Alert, Button } from 'flowbite-react';
import { Modal } from 'antd';
import { HiOutlineExclamationCircle, HiOutlineThumbUp } from 'react-icons/hi'
import "./dashboard.css"
import { useAuth } from '../../context/DataContext'

const Failed = () => {

    // const { userData } = useAuth();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const publicKey = "pk_test_a3948997364cfaf47cb77f3aef8b21fc7e51a8ac";


    const [formData, setFormData] = useState({
        phone_number: '',
        email: '',
        location: '',
        type: '',
        meter_number: '',
        amount: '',
      });

      

      const [confirm, setConfirm] = useState(false);

      const [show, setShow] = useState(false);

      const [custumer, setCustumer] = useState("");
      
      const [data, setData] = useState("");

      const [search, setSearch] = useState("");

      const [charge, setCharge] = useState("");

      const [fill, setFill] = useState("");

      const [errors, setErrors] = useState({});

      const [powerd, setPowerd] = useState({});

      const [empty, setEmpty] = useState(true);



    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const [trueModal, setTrueModal] = useState(false);
    const [thisUser, setThisUser] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [message, setMessage] = useState("");
    const [powerr, setPowerr] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const vtpassApiKey = "63ba3d3c61422c58f2a4fee1fa157852"
    const vtpassSecretKey = "SK_210c5eb49d231bbd75c8489d7449e8cba7c52fa3b4a"

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const modelOpen = (user) => {
        setOpenModal1(true);
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
        getCharges();
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

            setData(JSON.parse(body))

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

    const PPower = async (user) => {
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

            setPowerr(data)

             

            setMessage("");
        } catch (error) {
            console.log("Error!", error);
            setMessage(error);
        }
    };

    const handleReload = async (ppid) => {
        setSearch("Loading"); // Set loading state for UI feedback
    
        try {
            let headersList = {
                "api-key": vtpassApiKey,
                "secret-key": vtpassSecretKey,
                "Content-Type": "application/json",
            };
    
            let bodyContent = JSON.stringify({
                "request_id": ppid,
            });
    
            let response = await fetch("https://api-service.vtpass.com/api/requery", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
            });
    
            let data = await response.json();
    
            // Check if the response was successful
            if (data.code === "000") {
                console.log("Transaction reloaded", data);
                
                setTransaction(prevTransaction => {
                    const updatedTransactions = prevTransaction.map(user =>
                        user.ppid === ppid ? { ...user, token: data.token } : user
                    );
                    console.log("Updated Transactions: ", updatedTransactions); // Log updated state
                    return updatedTransactions;
                });
                
                setEmpty(false); // Reset empty state if necessary
            } else {
                console.error("Reload failed");
            }
    
            setSearch(""); // Reset loading state
        } catch (error) {
            console.error("Error reloading transaction", error);
            setSearch("Error loading data");
        }
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

       //Financial Calculations
    let amount;

    amount = parseFloat(formData.amount) + parseFloat(charge);

    const displayAmount = `₦${amount.toFixed(2)}`; // Format the amount with 2 decimal places

    const pl = amount - parseFloat(formData.amount);

    const tpl = powerd.content ? parseFloat(powerd.content.transactions.commision) + pl : pl;
    // console.log(powerd);
    const tpm = (tpl / amount) * 100;

    const Power = async () => {
        setSearch("Loading");

        let vtamount;

        if (formData.amount > 2500) {
            vtamount = formData.amount - ((1.5 / 100 * formData.amount)  + 100);
        } else {
            vtamount = formData.amount - (1.5 / 100 * formData.amount);
        }


        try {
            let headersList = {
                "api-key": vtpassApiKey,
                "secret-key": vtpassSecretKey,
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                "request_id": todayCode,
                "serviceID": formData.location,
                "billersCode": formData.meter_number,
                "variation_code": formData.type,
                "amount": vtamount,
                "phone": formData.phone_number
            });
    
            let response = await fetch("https://api-service.vtpass.com/api/pay", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
    
            let data = await response.json();
            console.log(data);

            if (data.code != "000"){
                setFill("We're experiencing an issue generating your token. Please wait a few minutes and check your transaction history again. If the delay persists, feel free to reach out to us via the in-app chat below");
            }else {
             setPowerd(data);
            }
            // Check if data contains required fields
             // Pass data to saveTransaction after a delay
             window.setTimeout(() => {
                saveTransaction(data);
            }, 1000);

            setSearch("");
        } catch (error) {
            console.log("Error!", error);
            setSearch(error);
        }
    };

    const paymentDone = () => {
        Power();
    };

    const checkMeter = async (e) =>{

        setSearch("Loading")

        e.preventDefault();

        // Validate form data
        const newErrors = {};
        if (!formData.location) newErrors.location = "Location is required.";
        if (!formData.type) newErrors.type = "Type is required.";
        if (!formData.meter_number) newErrors.meter_number = "Meter number is required.";
        if (!formData.amount) newErrors.amount = "Amount is required.";
        if (formData.amount < 1200 ) newErrors.amount = "Amount must be more than 1200.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
        setFill("Please fill all the fields correctly.");
        setSearch("")
        return;
        }

        if (isChecked) {
            try {
         
                let bodyContent = JSON.stringify({
                  "email":formData.email,
                  "meternumber":formData.meter_number
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
     
             } catch (error) {
               console.error('Error:', error);
             }
        }

        try {
            let headersList = {
                "api-key": vtpassApiKey,
                "secret-key": vtpassSecretKey,
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
               console.log(data);

               if (data.content.WrongBillersCode) {
                console.log("Wrong biller's code: This meter is not correct or is not a valid Ikeja Electric prepaid meter. Please check and try again");
                setFill("Wrong Meter number")
                setSearch("")
              } else {
                setCustumer(data.content);
                setSearch("") 
              }
              
        } catch (error) {
            console.log("Error!", error);
            setSearch(error);

        }

        
      };

      const getCharges = async () => {
    
        try {
           
           let response = await fetch("https://api.powerkiosk.ng/api/charges", { 
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
                console.log("Error:", data);
            }

        } catch (error) {
          console.error('Error:', error);
        }
        
    };

    
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,  // Spread the previous form data
      [name]: value,    // Update only the field being changed
    }));
  };

      const [reference, setReference] = useState("");

      const intervalIdRef = useRef(null);

      useEffect(() => {
        if (reference) {
            // Set interval and store the intervalId in the ref
            intervalIdRef.current = setInterval(() => {
              verifyStatus();
            }, 3000); // Polling every 3 seconds
          }
      
          return () => {
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current); // Clear interval on component unmount
            }
          };
        }, [reference]);

      const verifyStatus = async () => {
            
        const secretKey = "sk_live_e420981e0e63e685dca63fbecdc484beec33c5bd"; 
        const verifyUrl = "https://api.paystack.co/transaction/verify"; // Paystack verify endpoint

        try {
            // Call the transaction verify endpoint
            const verifyResponse = await fetch(`${verifyUrl}/${reference}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${secretKey}`,
                "Content-Type": "application/json",
              },
            });
    
            const verifyResult = await verifyResponse.json();
            if (!verifyResponse.ok) {
              console.error("Error verifying transaction:", verifyResult);
            } else {
              // Transaction verified successfully
              console.log("Transaction verified successfully:", verifyResult);
              if (verifyResult.data.status === "success") {
                paymentDone();
      
                // Stop the polling once payment is successful
                if (intervalIdRef.current) {
                  clearInterval(intervalIdRef.current); // Access intervalIdRef to clear the interval
                }
              }
            }
          } catch (error) {
            console.error("Error verifying transaction:", error);
          }
      }
      
      const initializePayment = async (e) => {
        e.preventDefault();
      
        const url = "https://api.paystack.co/transaction/initialize";
        const secretKey = "sk_live_e420981e0e63e685dca63fbecdc484beec33c5bd"; 
      
        const data = {
          email: email,
          amount: amount * 100, // Amount in kobo (100 kobo = 1 Naira)
        };
      
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${secretKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
      
          const result = await response.json();
          if (!response.ok) {
            console.error("Error initializing payment:", result);
            return;
          }
      
          let code = result.data.access_code;
          let reference = result.data.reference;

          setReference(reference);
          
          // Initialize Paystack Popup
          const paystackPopup = new PaystackPop();
          paystackPopup.resumeTransaction(code);
      
      
        } catch (error) {
          console.error("Error:", error);
        }
      };

      
      
      
      
    
  return (
    <>
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
            <div className='lg:col-span-2'>
                <Side/>
            </div>
            <div className='lg:col-span-10'>
                <Modal
                    open={openModal}
                    title="Purchase Token"
                    onCancel={() => setOpenModal(false)}
                    footer={
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => setOpenModal(false)}>
                                Done
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    }
                >
                    <div className="text-center">
                        {/* <HiOutlineThumbUp className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                        <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        <div className='mx-4'>
                             {
                            data ?
                            <>
                            <div className='flex'>
                                <p className='text-lg'>Token: {data.token || data.Token}</p>
                                <img src={copy} alt='copy' className='w-5 h-5 mt-1 ml-3 cursor-pointer' onClick={handleCopyToken}/>
                            </div>
                            </>  : 

                            <>
                            {
                        show ?
                        <>
                            <div className=' text-gray-700'>
                                <p className='text-lg font-bold my-10 text-center text-black'>Confirm Order</p>
                                <div className='flex  justify-between my-2'>
                                    <p>Customer Name:</p>
                                    <p className='ml-auto text-black'>{custumer.Customer_Name}</p>
                                </div>
                                <div className='flex  justify-between my-2'>
                                    <p>Meter Number: </p>
                                    <p className='ml-auto text-black'>{formData.meter_number}</p>
                                </div>
                                <div className='flex  justify-between my-2'>
                                    <p>Location: </p>
                                    <p className='ml-auto text-black'>{custumer.Address}</p>
                                </div>
                                <div className='flex  justify-between my-2'>
                                    <p>Meter Type: </p>
                                    <p className='ml-auto text-black'>{formData.type}</p>
                                </div>
                                <hr className=' my-8'/>
                                <p className='text-lg'>Total:</p>
                                <p className='text-lg mb-4 text-secondary'>{displayAmount}</p>
                            </div>
                            <button className='mb-20 bg-[#7B0323] w-full h-[45px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => initializePayment(e)}>
                            Buy
                            </button>
                        </> :
                        <>
                        <form className='mb-4 mt-14'>
                        <p className='font-semibold text-gray-700 my-2'>Phone Number:</p>
                        <div className=" mt-2">
                            <div >
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    placeholder="08123456789"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    style={{ fontSize: '1rem', height: '50px' }}
                                    className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.phone_number ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-2'>Email Address:</p>
                        <div className=" mt-2">
                            <div >
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ fontSize: '1rem', height: '50px' }}
                                    className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.email ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-2'>Location:</p>
                        <div className=" mt-2">
                            <div >
                                <select name="location" value={formData.location} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '50px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.location ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="ikeja-electric">IKEDC - Ikeja Electric</option>
                                    <option value="eko-electric">EKEDC - Eko Electric</option>
                                    <option value="kano-electric">KEDCO - Kano Electric</option>
                                    <option value="portharcourt-electric">PHED - Port Harcourt Electric</option>
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
                            {errors.location && <p className="text-red-500">{errors.location}</p>}
                        </div>
                        <p className='font-semibold text-gray-700 my-2'>Type of Meter:</p>
                        <div className=" mt-2">
                            <div >
                                <select name="type" value={formData.type} onChange={handleChange}
                                style={{ fontSize: '1rem', height: '50px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.type ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                >
                                    <option value="">-- Please Select one -- </option>
                                    <option value="prepaid">Pre-paid</option>
                                    <option value="postpaid">Post-paid</option>
                                </select>
                            </div>
                            {errors.type && <p className="text-red-500">{errors.type}</p>}
                        </div>
                        <p className='font-semibold text-gray-700 my-2'>Meter Number:</p>
                        <div className=" mt-2">
                            <div >
                                <input
                                    id="meter_number"
                                    name="meter_number"
                                    type="text"
                                    placeholder="37740846208442957296"
                                    value={formData.meter_number}
                                    onChange={handleChange}
                                    style={{ fontSize: '1rem', height: '50px' }}
                                    className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.meter_number ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                        </div>
                        <p className='font-semibold text-gray-700 my-2'>Amount:</p>
                        <div className=" mt-2">
                            <div >
                                <input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="eg. 1200 - min"
                                value={formData.amount}
                                onChange={handleChange}
                                style={{ fontSize: '1rem', height: '50px' }}
                                className={`py-2 pl-5 pr-3 block w-full border-2 rounded-xl focus:outline-none hover:border-[#7B0323] ${formData.amount ? 'border-gray-300' : 'border-[#7B0323]'}`}
                                />
                            </div>
                            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                        </div>
                        {custumer && !confirm ?
                        <>
                        <div className='bg-gray-100 italic text-lg mt-2 text-black'>
                            <p>Please confirm  your customer details to proceed.</p>
                            <p>Name: {custumer.Customer_Name}</p>
                        </div>
                        <button className='mb-20 bg-[#7B0323] w-full h-[45px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setShow(true)}>
                        Confirm
                        </button>
                        </>:''}
                        {!custumer && !confirm ?
                        <button className='mb-10 bg-[#7B0323] w-full h-[45px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => checkMeter(e)}>
                        Buy Power
                        </button>:""}
                        </form>
                        
                        </>
                    }


                            </>
                        }
                        {fill ? 
                        <Alert color="failure" className='mb-10 w-full'>
                            <span className="font-medium">Error!</span> {fill}
                        </Alert>: ""
                        }
                        </div>
                        </div>
                        
                    </div>
                </Modal>
                <Modal
                    open={openModal1}
                    title="Re-purchase Token"
                    onCancel={() => setOpenModal1(false)}
                >
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
                        <Button color="failure" onClick={()=> PPower(thisUser)}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal1(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    open={trueModal}
                    title=" "
                    onCancel={() => setTrueModal(false)}
                >
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
                </Modal>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' pl-6'>
                        <p className='text-lg font-medium mb-4'>Failed Transactions</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        {message === "Loading" ? 
                            <Alert color="success">
                                Loading, this might take a few seconds
                            </Alert>: null
                        }
                        <div className='bg-white w-[350px] mt-10 rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md cursor-pointer'
                        onClick={() => setOpenModal(true)}>
                            <p>Purchase Power</p>
                        </div>
                        <div className='bg-white rounded-lg p-5 px-20 text-gray-900 text-sm w-[989px] my-10'>
                            <p className='text-lg font-bold text-center my-10'>Failed Transactions</p>
                        <div className='overflow-x-auto'>
                            <div>
                                <div className='flex text-black font-base font-semibold'>
                                    <p className=' my-2 min-w-[200px]'>Email:</p>
                                    <p className=' my-2 min-w-[150px]'>Date:</p>
                                    <p className=' my-2 min-w-[150px]'>Meter Number:</p>
                                    <p className=' my-2 min-w-[150px]'>Amount Paid:</p>
                                    <p className=' my-2 min-w-[170px]'>Token:</p>
                                    <p className=' my-2 min-w-[150px]'>Location:</p>
                                    <p className=' my-2 min-w-[170px]'>Reload</p>
                                    <p className=' my-2 min-w-[170px]'>Re-purchase</p>
                                </div>
                            </div>
                        {currentUsers.length > 0 ? (
                            <div className="">
                                <div className="">
                                    {currentUsers.map((user) => (
                                        <div key={user.ppid} style={{ cursor: 'pointer' }}>
                                            <div className='flex'>
                                                <p className='my-2 min-w-[200px]'>{user.email}</p>
                                                <p className='my-2 min-w-[150px]'>{formatDate(user.date)}</p>
                                                <p className='my-2 min-w-[150px]'>{user.meternumber}</p>
                                                <p className='my-2 min-w-[150px]'>{user.amount}</p>

                                                {/* Display token */}
                                                <p className='my-2 min-w-[170px]'>
                                                    {user.token ? user.token : "No token available"}
                                                </p>

                                                <p className='my-2 min-w-[150px]'>{user.location}</p>
                                                <button className='my-2 bg-secondary rounded-lg text-white py-2 px-4 min-w-[120px] mx-2 font-bold'
                                                    onClick={() => handleReload(user.ppid)}>
                                                    Reload
                                                </button>
                                                <button className='my-2 bg-secondary rounded-lg text-white py-2 px-4 min-w-[120px] mx-2 font-bold'
                                                    onClick={() => { modelOpen(user) }}>
                                                    Re-purchase
                                                </button>
                                            </div>
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