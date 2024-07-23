import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Side from './Side';
import Foot from './Foot';
import { Alert } from 'flowbite-react';
import "./dashboard.css";

const Filter = () => {

  let navigate = useNavigate();

  const { date } = useParams();


  const [transaction, setTransaction] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [amountpaid, setAmountpaid] = useState(0);
  const [tcost, setTcost] = useState(0);
  const [tcommission, setTcommission] = useState(0);
  const [tprofit, setTprofit] = useState(0);
  const usersPerPage = 10;

  const getTransactions = async () => {
    setMessage("Loading");
    try {
      let bodyContent = JSON.stringify({
            "date": date
        });
        
        let response = await fetch("https://ampupserver.onrender.com/transactions/date", { 
            method: "POST",
            body: bodyContent,
            headers: {
            "Content-Type": "application/json"
            }
        });

      if (response.ok) {
        let data = await response.json();
        console.log(data)
        setTransaction(data);

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
    navigate(`/user/${email}`);
  };

  return (
    <>
      <div>
        <Side />
        <div>
          <div className="sm:block hidden bg-[#F3F3F3] pt-10 pl-[223px] w-screen h-full">
            <div className='pl-6'>
              <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
              </div>
              {message === "Loading" && (
                <Alert color="success" className='mt-5'>
                  Loading, this might take a few seconds
                </Alert>
              )}
              
              <div className='flex mt-10'>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Profit cost: 1000 Naira</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Profit cost: 1000 Naira</p>
                </div>
                <div className='bg-white rounded-2xl mx-4 p-5 border-gray-500 border-2 shadow-md'>
                  <p>Profit cost: 1000 Naira</p>
                </div>
              </div>
              <div className='bg-white rounded-lg p-5 px-20 text-gray-900 text-sm w-[989px] my-10'>
                <p className='text-lg font-bold text-center my-10'>Financial Analysis Table</p>
                <div className='overflow-x-auto'>
                  <div>
                    <div className='flex text-black font-base font-semibold'>
                      {["Email", "Date", "Amount Paid", "Units", "Charge", "VT Pass ID", "Profit Plus ID", "Discount Percent", "Discount Amount", "Cost", "Commission Earned", "Total Profit/Loss", "Total Profit Margin", "VAT(7.5 %)"].map(header => (
                        <p key={header} className='my-4 min-w-[275px]'>{header}:</p>
                      ))}
                    </div>
                  </div>
                  {currentUsers.length > 0 ? (
                    <div className="">
                      {currentUsers.map((user, index) => (
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
                            <p className='my-4 min-w-[275px]'>{user.tpl}</p>
                            <p className='my-4 min-w-[275px]'>{user.tpm}</p>
                            <p className='my-4 min-w-[275px]'>{(user.amount - (user.amount / 1.075)).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
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

export default Filter;
