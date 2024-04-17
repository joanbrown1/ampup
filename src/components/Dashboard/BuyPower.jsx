import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack'
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import "./dashboard.css"

const BuyPower = () => {

    const navigate = useNavigate();

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));

    const userData = storedUserData;

    let meterno = userData.meternumber;


    const publicKey = "pk_test_e51a4455891459c394a3c0d3a075fdb239e1f059";

    const [formData, setFormData] = useState({
        location:"",
        type:"",
        meter_number:"",
        request_id:"",
        amount:"",
        phone:userData.phonenumber,
        email:userData.email
      });

      const email = userData.email;

      const [confirm, setConfirm] = useState(false);

      const [show, setShow] = useState(false);

      const [custumer, setCustumer] = useState("");

      const [data, setData] = useState("");
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const checkMeter = async (e) =>{
        e.preventDefault();


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
               
               let response = await fetch("https://sandbox.vtpass.com/api/merchant-verify", { 
                 method: "POST",
                 body: bodyContent,
                 headers: headersList
               });
               
               let data = await response.json();
               console.log(data);
               console.log(data.content.Address)
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
        console.log("check");
    
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
            
            let response = await fetch("https://sandbox.vtpass.com/api/pay", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.json();
            console.log(data);
            console.log(data.token);
            setData(data);

               
            let body = JSON.stringify({
                "email":email,
                "meternumber":formData.meter_number,
                "location":formData.location,
                "amount":amount
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
               
        } catch (error) {
            console.log("Error!", error);
        }
    };
    


    const amount = parseFloat(formData.amount) + 100; // Add 100 to the user input amount
    const displayAmount = `₦${amount.toFixed(2)}`; // Format the amount with 2 decimal places

    const paymentDone = () => {
        console.log("done");
        Power();
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
    

  return (
    <>
        <div className=''>
            <Sidebar/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 ml-[223px] w-full h-full">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Buy Power</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-2'>Your Meter Number:</p></div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        <div className='ml-[300px] mt-10'>
                            {
                                data ?
                                <>
                                <div className='border-2 border-green-300 bg-green-200 p-5 w-[350px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                                    <p>Token: {data.token || data.Token}</p>
                                </div>
                                <button className='mb-5 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/dashboard")}>
                                Go Home
                                </button>
                                </> : ""
                            }
                            {
                                show ?
                                <>
                                <div className='border-2 border-gray-300 bg-gray-200 p-5 w-[350px] italic rounded-lg text-gray-700'>
                                    <p>Customer Name: {custumer.Customer_Name}</p>
                                    <p>Meter Number: {formData.meter_number}</p>
                                    <p>Location: {formData.location}</p>
                                    <p>Meter Type: {formData.type}</p>
                                    <p>Amout: {displayAmount}</p>
                                </div>
                                {/* <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => Power(e)}>
                                Buy
                                </button> */}
                                <PaystackButton className="paystack-button w-[350px]" {...componentProps} />
                                </> :
                                <>
                                <form className='mb-4' >
                            <p className='font-semibold text-gray-700 my-4'>Location:</p>
                            <div className="w-[350px] mt-2">
                                <div className="relative">
                                    <select name="location" value={formData.location} onChange={handleChange}
                                    style={{ fontSize: '1rem', height: '70px' }}
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    >
                                        <option value="">-- Please Select one -- </option>
                                        <option value="prepaid">Pre-paid</option>
                                        <option value="postpaid">Post-paid</option>
                                    </select>
                                </div>
                            </div>
                            <p className='font-semibold text-gray-700 my-4'>Meter Number:</p>
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                            {confirm ?
                            <>
                           
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                            <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setShow(true)}>
                            Continue
                            </button>
                            </>:''}
                            {custumer && !confirm ?
                            <>
                            <div className='bg-gray-100 italic text-lg mt-2 text-black'>
                                <p>Please confirm  your customer details to proceed.</p>
                                <p>Name: {custumer.Customer_Name}</p>
                            </div>
                            <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setConfirm(true)}>
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
                        </div>
                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center ">
                    <div className='my-10'>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <div className='flex'><img src={eye} className='w-[16px]'/><p className='text-sm font-light text-white pl-1'>Your Meter Number:</p></div>
                            <p className='text-white text-2xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        {
                                data ?
                                <>
                                <div className='border-2 border-green-300 bg-green-200 p-5 w-[328px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                                    <p>Token: {data.token || data.Token}</p>
                                </div>
                                <button className='mb-5 bg-[#7B0323] w-[328px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/dashboard")}>
                                Go Home
                                </button>
                                </> : ""
                            }
                        {
                            show ?
                            <>
                                <div className='border-2 border-gray-300 bg-gray-200 p-5 w-[328px] text-gray-700 rounded-lg italic my-10'>
                                    <p>Customer Name: {custumer.Customer_Name}</p>
                                    <p>Meter Number: {formData.meter_number}</p>
                                    <p>Location: {formData.location}</p>
                                    <p>Meter Type: {formData.type}</p>
                                    <p>Amout: {displayAmount}</p>
                                </div>
                                {/* <button className='mb-20 bg-[#7B0323] w-[328px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => Power(e)}>
                                Buy
                                </button> */}
                                <PaystackButton className="paystack-button w-[328px]" {...componentProps} />
                            </> :
                            <>
                            <form className='mb-4 mt-14'>
                            <p className='font-semibold text-gray-700 my-4'>Location:</p>
                            <div className="w-[350px] mt-2">
                                <div className="relative">
                                    <select name="location" value={formData.location} onChange={handleChange}
                                    style={{ fontSize: '1rem', height: '70px' }}
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    >
                                        <option value="">-- Please Select one -- </option>
                                        <option value="prepaid">Pre-paid</option>
                                        <option value="postpaid">Post-paid</option>
                                    </select>
                                </div>
                            </div>
                            <p className='font-semibold text-gray-700 my-4'>Meter Number:</p>
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                            {confirm ? 
                            <>
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
                                    className="py-2 pl-5 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                    />
                                </div>
                            </div>
                            <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setShow(true)}>
                            Continue
                            </button>
                            </>:''}
                            {custumer && !confirm ?
                            <>
                            <div className='bg-gray-100 italic text-lg mt-2 text-black'>
                                <p>Please confirm  your customer details to proceed.</p>
                                <p>Name: {custumer.Customer_Name}</p>
                            </div>
                            <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => setConfirm(true)}>
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
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default BuyPower