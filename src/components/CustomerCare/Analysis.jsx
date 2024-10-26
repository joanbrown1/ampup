import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Side from './Side';
import Foot from './Foot';
import { Alert } from 'flowbite-react';
import "./dashboard.css";
import filter from "../../assets/filter.png"
import Dropdown from './Dropdown';

const Analysis = () => {
    
  const [startDate, setStartDate] = useState("");
  const [daily, setDaily] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const options = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let navigate = useNavigate();

  const [transaction, setTransaction] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [amountpaid, setAmountpaid] = useState(0);
  const [tcost, setTcost] = useState(0);
  const [tcommission, setTcommission] = useState(0);
  const [tprofit, setTprofit] = useState(0);
  const [tcharge, setTcharge] = useState(0);
  const usersPerPage = 10;

  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const getTransactions = async () => {
    setMessage("Loading");
    try {
      let response = await fetch("https://api.powerkiosk.ng/api/transactions", {
        method: "GET",
        headers: {
          "Accept": "*/*"
        }
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data)
        setTransaction(data);

         // Calculate the total amount paid
         const totalAmountPaid = data.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
         setAmountpaid(totalAmountPaid);

         const totalCost = data.reduce((acc, transaction) => acc + parseFloat(transaction.cost || 0), 0);
        setTcost(totalCost);

        const totalCommission = data.reduce((acc, transaction) => acc + parseFloat(transaction.commision || 0), 0);
        setTcommission(totalCommission);

        let totalProfit = data.reduce((sum, entry) => {
          // Calculate discountPercentValue for each entry
          const discountPercentValue = entry.discountpercent
            ? (parseFloat(entry.discountpercent) / 100) * parseFloat(entry.amount || 0)
            : 0;
    
          // Calculate profit for each entry
          const profit = 
            parseFloat(entry.charge || 0) +
            parseFloat(entry.commision || 0) +
            parseFloat(entry.discountamount || 0) +
            discountPercentValue;
    
          // Sum the profits
          return sum + profit;
        }, 0); // Initialize sum at 0
        setTprofit(totalProfit);

        const totalCharge = data.reduce((acc, transaction) => acc + parseFloat(transaction.charge || 0), 0);
        setTcharge(totalCharge);



      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setMessage("");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = transaction.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (inputDate) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
  };

  const handleUserClick = (email) => {
    navigate(`/admin/user/${email}`);
  };

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setDaily(false);
    }
  };

  useEffect(() => {
    if (daily) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [daily]);

  const handleSelect = (option) => {
    const currentYear = new Date().getFullYear();
    if (option === "January"){
        setStartDate(`${currentYear}-01`);
    } else if (option === "Febuary") {
        setStartDate(`${currentYear}-02`);
    } else if (option === "March") {
        setStartDate(`${currentYear}-03`);
    } else if (option === "April") {
        setStartDate(`${currentYear}-04`);
    } else if (option === "May") {
        setStartDate(`${currentYear}-05`);
    } else if (option === "June") {
        setStartDate(`${currentYear}-06`);
    } else if (option === "July") {
        setStartDate(`${currentYear}-07`);
    } else if (option === "August") {
        setStartDate(`${currentYear}-08`);
    } else if (option === "September") {
        setStartDate(`${currentYear}-09`);
    } else if (option === "October") {
        setStartDate(`${currentYear}-10`);
    } else if (option === "November") {
        setStartDate(`${currentYear}-11`);
    } else if (option === "December") {
        setStartDate(`${currentYear}-12`);
    }

   
  };

  const loadDate = (date) => {
    setStartDate(date);

    
  };

  useEffect(() => {
    if (startDate) {
      navigate('/admin/filter/' + startDate);
    }
  }, [startDate, navigate]);
  return (
    <>
      <div className='mb-[30px] lg:grid lg:grid-cols-12'>
      <div className='lg:col-span-2'>
          <Side/>
      </div>
      <div className='lg:col-span-10'>
          <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
            <div className='pl-6'>
              <p className='text-lg font-medium mb-4'>Analysis</p>
              <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
              </div>
              {message === "Loading" && (
                <Alert color="success" className='mt-5'>
                  Loading, this might take a few seconds
                </Alert>
              )}
              <div className='bg-white rounded-lg p-5 flex w-[350px] drop-shadow-md'>
                <img src={filter} className='w-6 h-6'/>
                <p className='text-gray-500 px-2'>Filter by:</p>
                <div className='mx-4'>
                    {monthly ?
                    <>
                    <Dropdown options={options} onSelect={handleSelect} />
                    </> :
                    <p className='w-[200px] text-center border rounded-lg border-gray-300 p-2 text-gray-600 mb-2 hover:bg-gray-50' onClick={() => setMonthly(true)}>Monthly</p>
                    }
                    {daily ? 
                    <div ref={modalRef}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => loadDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date('2024-4-25')}
                        maxDate={new Date()}
                        placeholderText="Select a date"
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                    />
                    </div>
                    :
                    <p className='w-[200px] text-center border rounded-lg border-gray-300 p-2 text-gray-600 hover:bg-gray-50' onClick={() => setDaily(true)}>Daily</p>}
                </div>
              </div>
              <div className='flex mt-10'>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Total Amount Paid: {amountpaid}</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Total cost: {tcost}</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Total Commission Earned: {tcommission}</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Total Profit: {tprofit}</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Total Charge: {tcharge}</p>
                </div>
              </div>
              <div className='bg-white rounded-lg p-5 px-20 text-gray-900 text-sm w-[989px] my-10'>
                <p className='text-lg font-bold text-center my-10'>Financial Analysis Table</p>
                <div className='overflow-x-auto'>
                  <div>
                    <div className='flex text-black font-base font-semibold'>
                      {["Email", "Date", "Amount Paid", "Units", "Charge", "VT Pass ID", "Profit Kiosk ID", "Discount Percent", "Discount Amount", "Cost", "Commission Earned", "Total Profit/Loss"].map(header => (
                        <p key={header} className='my-4 min-w-[275px]'>{header}:</p>
                      ))}
                    </div>
                  </div>
                  {currentUsers.length > 0 ? (
                    <div className="">
                      {currentUsers.map((user, index) => {
                        const discountPercentValue = user.discountpercent ? (user.discountpercent / 100) * user.amount : 0;
                        const totalProfitLoss = parseFloat(user.charge || 0) + parseFloat(user.commision || 0) + parseFloat(user.discountamount || 0) + discountPercentValue;

                        return (
                          <div key={index} onClick={() => handleUserClick(user.email)} style={{ cursor: 'pointer' }}>
                            <div className='flex'>
                              <p className='my-4 min-w-[275px]'>{user.email}</p>
                              <p className='my-4 min-w-[275px]'>{formatDate(user.date)}</p>
                              <p className='my-4 min-w-[275px]'>{user.amount}</p>
                              <p className='my-4 min-w-[275px]'>{user.units}</p>
                              <p className='my-4 min-w-[275px]'>{user.charge}</p>
                              <p className='my-4 min-w-[275px]'>{user.vtid}</p>
                              <p className='my-4 min-w-[275px]'>{user.ppid}</p>
                              <p className='my-4 min-w-[275px]'>{user.discountpercent}</p>
                              <p className='my-4 min-w-[275px]'>{user.discountamount}</p>
                              <p className='my-4 min-w-[275px]'>{user.cost}</p>
                              <p className='my-4 min-w-[275px]'>{user.commision}</p>
                              <p className='my-4 min-w-[275px]'>{totalProfitLoss.toFixed(2)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className='text-secondary text-center py-5 italic'>No history</p>
                  )}
                </div>

                {/* Pagination */}
                <div className='pagination text-center mt-6'>
                  {Array.from({ length: Math.ceil(transaction.length / usersPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'text-blue-500' : 'text-gray-700'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center mb-20">
            <div className='my-10'>
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
  );
};

export default Analysis;
