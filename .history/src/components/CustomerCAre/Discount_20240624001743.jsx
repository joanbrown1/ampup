import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Side from './Side';
import Foot from './Foot';
import { Alert } from 'flowbite-react';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import DatePicker from 'react-datepicker'; // Import the date picker component
import "./dashboard.css";
import { useAuth } from '../../context/DataContext';
import { HiCalculator } from 'react-icons/hi';

const Discount = () => {
    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));
    const userData = storedUserData;
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [discounts, setDiscounts] = useState("");
    const [er, setEr] = useState("");
    const [done, setDone] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        percent: 0,
        amount: 0,
        limit: new Date(), // Set default value as today's date
    });

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            limit: date,
        });
    };

    const getDiscounts = async () => {
        setMessage("Loading");
        try {
            let response = await fetch("https://ampupserver.onrender.com/discounts", {
                method: "GET",
                headers: {
                    "Accept": "*/*"
                }
            });
            let data = await response.json();
            if (response.status === 200) {
                setDiscounts(data);
            } else {
                console.log("Error:", response.status);
            }
            setMessage("");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getDiscounts();
    }, []);

    const setDiscountUp = async (e) => {
        e.preventDefault();
        try {
            let bodyContent = JSON.stringify({
                "code": formData.code,
                "percent": formData.percent,
                "amount": formData.amount,
                "limit": formData.limit.toISOString().substr(0, 10) // Convert date to ISO string
            });
            let response = await fetch("https://ampupserver.onrender.com/discount", {
                method: "POST",
                body: bodyContent,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await response.json();
            if (response.status === 200) {
                setDone(true);
                getDiscounts();
            } else {
                console.log("Error:", response.status);
                setEr(data);
            }
            setFormData({
                code: "",
                percent: 0,
                amount: 0,
                limit: new Date()
            });
        } catch (error) {
            console.error('Error:', error);
            setEr(error);
        }
    };

    const formatDate = (inputDate) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <>
            <div className=''>
                <Side />
                <div>
                    <div className="sm:block hidden bg-[#F3F3F3] pb-10 pl-[223px] w-screen h-fit">
                        <div className=' pl-6'>
                            <p className='text-lg font-medium mb-4'>Add Discount</p>
                            <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                                <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                            </div>
                            {message === "Loading" ?
                                <Alert color="success">
                                    Loading, this might take a few seconds
                                </Alert> : ""
                            }
                            <div className='bg-white rounded-lg p-5 px-10 my-10 text-gray-900 text-sm w-[989px]'>
                                <p className='text-lg font-bold text-center my-10'>All Discounts Details</p>
                                <div className='grid grid-cols-4 text-black font-base font-semibold'>
                                    <p className=' my-4 '>Code:</p>
                                    <p className=' my-4 '>Percent:</p>
                                    <p className=' my-4 '>Amount:</p>
                                    <p className=' my-4 '>Date Discount Ends:</p>
                                </div>
                                {discounts ?
                                    (discounts.map((item, index) => (
                                        <div className='' key={index}>
                                            <div className='grid grid-cols-4'>
                                                <p className=' my-4 '>{item.code}</p>
                                                <p className=' my-4 '>{item.percent}</p>
                                                <p className=' my-4 '>{item.amount}</p>
                                                <p className=' my-4 '>{formatDate(item.limit)}</p>
                                            </div>
                                        </div>
                                    ))) :
                                    (<p className='text-secondary text-center py-5 italic'>No discounts saved</p>)}
                            </div>

                            <div className='grid grid-cols-2 w-[989px]'>
                            <div className='border border-secondary rounded-lg p-4 w-[400px] my-10'>
                                <p className='text-center py-2 text-lg font-bold'>Set New Discount Code with Percentage</p>
                                <div className='flex justify-center items-center'>
                                    <form className='mb-4' >
                                        <p className='font-semibold text-gray-700 my-4'>Discount Code:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <input
                                                    id="code"
                                                    name="code"
                                                    type="text"
                                                    placeholder="Discount Code"
                                                    value={formData.code}
                                                    onChange={handleChange}
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='font-semibold text-gray-700 my-4'>Percentage:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <input
                                                    id="percent"
                                                    name="percent"
                                                    type="number"
                                                    placeholder="Set Percent"
                                                    value={formData.percent}
                                                    onChange={handleChange}
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='font-semibold text-gray-700 my-4'>Date Discounts Ends:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <DatePicker
                                                    id="limit"
                                                    name="limit"
                                                    selected={formData.limit}
                                                    onChange={handleDateChange}
                                                    dateFormat="yyyy-MM-dd"
                                                    placeholderText="Date Discount Ends"
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => setDiscountUp(e)}>
                                            Submit
                                        </button>
                                    </form>
                                    
                                </div>
                                {done ?
                                        <Alert color="success" className='w-[350px]'>
                                            Done, discounts added
                                        </Alert> : ""
                                    }
                                    {er ?
                                        <Alert color="danger" className='w-[350px]'>
                                            {er}
                                        </Alert> : ""
                                    }
                            </div>
                            <div className='border border-secondary rounded-lg p-4 w-[400px] my-10'>
                                <p className='text-center py-2 text-lg font-bold'>Set New Discount Code with Amount</p>
                                <div className='flex justify-center items-center'>
                                    <form className='mb-4' >
                                        <p className='font-semibold text-gray-700 my-4'>Discount Code:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <input
                                                    id="code"
                                                    name="code"
                                                    type="text"
                                                    placeholder="Discount Code"
                                                    value={formData.code}
                                                    onChange={handleChange}
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='font-semibold text-gray-700 my-4'>Amount:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <input
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    placeholder="Set Amount"
                                                    value={formData.amount}
                                                    onChange={handleChange}
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='font-semibold text-gray-700 my-4'>Date Discounts Ends:</p>
                                        <div className="w-[350px] mt-2">
                                            <div className="relative">
                                                <DatePicker
                                                    id="limit"
                                                    name="limit"
                                                    selected={formData.limit}
                                                    onChange={handleDateChange}
                                                    dateFormat="yyyy-MM-dd"
                                                    placeholderText="Date Discount Ends"
                                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                                    className="py-2 pl-10 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <HiCalculator />
                                                </div>
                                            </div>
                                        </div>
                                        <button className='bg-[#7B0323] w-[350px] h-[60px] mt-12 hover:bg-white hover:text-black p-2 border-[#7B0323] border-2 rounded-lg text-white text-lg' onClick={(e) => setDiscountUp(e)}>
                                            Submit
                                        </button>
                                    </form>
                                    
                                </div>
                                {done ?
                                        <Alert color="success" className='w-[350px]'>
                                            Done, discounts added
                                        </Alert> : ""
                                    }
                                    {er ?
                                        <Alert color="danger" className='w-[350px]'>
                                            {er}
                                        </Alert> : ""
                                    }
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
                <Foot />
            </div>
        </>
    )
}

export default Discount;
