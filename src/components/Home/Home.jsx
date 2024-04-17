import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack'
import "./home.css"
import arm from "../../assets/arm.png"
import armsm from "../../assets/armsm.png"
import speed from "../../assets/time.png"
import click from "../../assets/one.png"
import secure from "../../assets/secure.png"
import orange from "../../assets/orange.png"
import green from "../../assets/green.png"
import yellow from "../../assets/yellow.png"
import blue from "../../assets/blue.png"
import purple from "../../assets/purple.png"
import white from "../../assets/white.png"
import history from "../../assets/history.png"
import innovation from "../../assets/innovation.png"
import payw from "../../assets/payw.png"
import paywsm from "../../assets/paymentw.jpg"
import smile from "../../assets/paym.png"

const Home = () => {

  const navigate = useNavigate();

  const publicKey = "pk_test_e51a4455891459c394a3c0d3a075fdb239e1f059";

  const [formData, setFormData] = useState({
      location:"",
      type:"",
      meter_number:"",
      request_id:"",
      amount:"",
      phone:"08139378449",
      email:"test@gmail.com"
    });

    const [show, setShow] = useState(false);

    const email = "test@gmail.com"

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
      console.log("ok")
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
             setShow(true);
             
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
    <div className='font lg:pl-[150px] md:pl-[120px]'>
    <div className='background1 hidden sm:block'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='text-left mt-[50px]  rounded-lg pl-20 pt-20 shadow-md'>
        <p className='text-5xl text-[#7B0323] font-bold italic'>Buy Power</p>
          {
            data ?
            <>
            <div className='border-2 border-green-300 bg-green-200 p-5 w-[350px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                <p>Token: {data.token || data.Token}</p>
            </div>
            <button className='mb-5 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/")}>
            Done
            </button>
            </> : ""
        }
          
              {
                show ?
                <>
                <div className='border-2 border-gray-300 bg-gray-200 p-5 w-[350px] italic rounded-lg text-gray-700 mt-10'>
                    <p>Customer Name: {custumer.Customer_Name}</p>
                    <p>Meter Number: {formData.meter_number}</p>
                    <p>Location: {formData.location}</p>
                    <p>Meter Type: {formData.type}</p>
                    <p>Amout: {displayAmount}</p>
                </div>
                <PaystackButton className="paystack-button w-[350px]" {...componentProps} />
                </> :
                <>
                <form >
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
              <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => checkMeter(e)}>
              Buy Power
              </button>
              </form>
                </>
              }
              
          
          {/* <p className='fontlg mb-3'>
          Empower your utility management with AmpUp
          </p>
          <p className='w-[420px] text-md'>
          Where paying your electricity bills is as simple as a swipe. Welcome to the future of convenience, right at your fingertips.
          </p>
          <div className='flex mt-4'>
            <button className='bg-[#7B0323] rounded-md px-8 py-3 text-white'>
              Get Started
            </button>
            <p className='text-[#7B0323] underline-offset-4 underline ml-8 mt-2'>
              I need more explanation
            </p>
          </div> */}
        </div>
        <div>
          <img src={arm} className='w-[570px] mt-20'/>
        </div>
      </div>
    </div>
    <div className='background1 lg:hidden md:hidden'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        {/* <div className='text-left mx-8 mt-14'>
          <p className='fontsm mb-3'>
          Empower your utility management with Amp Up
          </p>
          <p className='text-md'>
            where paying your electricity bills is as simple as a swipe. Welcome to the future of convenience, right at your fingertips.
          </p>
          <div className='flex mt-4'>
            <button className='bg-[#7B0323] rounded-md px-4 py-2 text-white'>
              Get Started
            </button>
            <p className='text-[#7B0323] underline-offset-4 underline ml-4 mt-2'>
              I need more explanation
            </p>
          </div>
        </div> */}
        <div className='text-left mx-8 mt-14 '>
          <p className='text-3xl text-[#7B0323] font-bold italic'>Buy Power</p>
          {
            data ?
            <>
            <div className='border-2 border-green-300 bg-green-200 p-5 w-[350px] italic rounded-lg text-green-500 text-lg my-2 mt-10'>
                <p>Token: {data.token || data.Token}</p>
            </div>
            <button className='mb-5 bg-[#7B0323] w-[350px] h-[60px] mt-5 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={() => navigate("/")}>
            Done
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
                <PaystackButton className="paystack-button w-[350px]" {...componentProps} />
                </> :
                <>
                <form>
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
              <button className='mb-20 bg-[#7B0323] w-[350px] h-[60px] mt-10 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => checkMeter(e)}>
              Buy Power
              </button>
              </form>
                </>
              }
              
        </div>
        <div>
          <img src={armsm} className='w-[570px] lg:ml-[90px]'/>
        </div>
      </div>
    </div>
    <div className='lg:pr-[150px] md:pr-[150px] px-8 lg:px-0 md:px-0'>
      
      <p className='text-center text-3xl font-bold my-20'>Why Choose AmpUp</p>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12'>
        <div>
          <img src={speed} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
            Lightning Speed
          </p>
          <p className='px-5 pb-5 font-light'>
            Amp Up guarantees instant transactions, sparing you time in today's fast-paced world. Click, pay, done – no more queues or delays.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#FA5252]'>Learn more</p>
            <img src={orange} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={click} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          One-Click Convenience
          </p>
          <p className='px-5 pb-5 font-light'>
          Simplify payments with Amp Up's one-click feature. Effortlessly complete transactions, no manual processes needed. Enjoy ease with every tap.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#94D82D]'>Learn more</p>
            <img src={green} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={secure} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Fortified Security
          </p>
          <p className='px-5 pb-5 font-light'>
          Rest assured, Amp Up's robust security shields your transactions. Your sensitive information stays protected throughout, giving you peace of mind.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#FCC419]'>Learn more</p>
            <img src={yellow} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={history} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Transaction Transparency
          </p>
          <p className='px-5 pb-5 font-light'>
          Amp Up offers transparent payment tracking, ensuring financial control. Access your transaction history easily for full transparency.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#5C7CFA]'>Learn more</p>
            <img src={blue} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
        <div>
          <img src={innovation} className='w-[80px] h-[80px] rounded-lg ml-5'/>
          <p className='px-5 py-5 font-bold'>
          Future-Proof Innovation
          </p>
          <p className='px-5 pb-5 font-light'>
          Revolutionize payments with Amp Up. Embrace cutting-edge tech for streamlined finance. Stay ahead, never settle for old ways.
          </p>
          <div className='flex ml-5'>
            <p className='text-[#4E2391]'>Learn more</p>
            <img src={purple} className='w-[24px] h-[24px] ml-2'/>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <img src={payw} className='rounded-lg hidden sm:block'/>
        <img src={paywsm} className='rounded-sm lg:hidden md:hidden'/>
        <div className='bg-[#FFE9EF] py-2 px-10 rounded-lg shadow-lg mt-10'>
          <div className='grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 my-10 '>
            <div className='lg:col-span-2 md:col-span-2'>
              <p className='hidden sm:block text-3xl font-bold text-left'>
              About <br/> Amp Up
              </p>
              <p className='text-center text-3xl font-bold lg:hidden md:hidden'>About Amp Up</p>
            </div>
            <div className='lg:col-span-3 md:col-span-3'>
              <p className='my-5 lg:my-0 md:my-0'>
              Amp Up: Revolutionize your electricity payments and beyond. Seamlessly manage all your utility expenses in one place. With a user-friendly interface and secure transactions, Amp Up puts control at your fingertips. Say goodbye to hassle and embrace convenience. Experience the future of utility payments with Amp Up
              </p>
            </div>
          </div>
          <div className='flex justify-center items-center mb-5'>
            <button className='bg-[#7B0323] rounded-md px-6 py-4 text-white shadow-2xl flex'>
              Get Started
              <img src={white} className='w-[24px] h-[24px] ml-2'/>
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* <div className='lg:mr-[150px] md:mr-[150px] mx-8 lg:mx-0 md:mx-0'>
      <div className='mt-28'>
        <p className='fontlg hidden sm:block'>Why Choose AmpUp</p>
        <p className='fontsm lg:hidden md:hidden'>Why Choose AmpUp</p>
        <p className='my-4'> Seamlessly manage your utility payments, enjoy unparalleled convenience, and join a community revolutionizing the way we handle electricity – all with just a tap.</p>
      </div>
      <div className='lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-[100px]'>
        <div>
        <div className='bg-[#7b0323] rounded-lg border-[13px] border-[#E8EEFB] text-white w-[500px]  p-8 mb-8'>
            <p className='fontsm mb-6'>Secure and Reliable Transactions:</p>
            <p>At Amp Up, security is paramount. With robust measures in place, your transactions are always safe and secure, whether you're paying bills or sending funds to friends</p> 
          </div>
          <div className='bg-white rounded-lg border-[13px] border-[#E8EEFB] text-black w-[500px]  p-8 '>
            <p className='fontsm mb-6'>Easy payment process:</p>
            <p>Amp Up simplifies payments. With a user-friendly interface, just select your provider, enter details, and pay securely. Easy!</p>
          </div>
          
        </div>
        <div>
          <img src={smile} className='rounded-lg '/>
        </div>
      </div>
    </div> */}
    </div>
    </>
  )
}

export default Home