import React, { useEffect, useState } from 'react';
import faq from "../../assets/faq.png"
import down from "../../assets/down-arrow.png"
import cross from "../../assets/cross.png"
import comment from "../../assets/comment.png"

const FAQ = () => {

    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    // Fetch the FAQs from the API
    useEffect(() => {
        fetch('https://api.powerkiosk.ng/api/faqs') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            setFaqs(data); // Assuming the API returns an array of FAQs
            setLoading(false);
        })
        .catch(() => {
            setError('Failed to load FAQs.');
            setLoading(false);
        });
    }, []);

    // Toggle the FAQ answer on click
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return <p>Loading FAQs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


  return (
    <>
    <div className='bg-[#FFE9EF] lg:flex p-10 lg:m-20 md:m-14 m-5 rounded-lg justify-center items-center'>
        <div className='text-gray-700'>
            <p className='lg:text-4xl text-2xl font-bold'>Frequently Asked Questions</p>
            <p className='mt-4 lg:text-lg text-gray-500'>Hit pause on the questions, We've got you covered – just walk right in!</p>
        </div>
        <img src={faq} className='w-[147px] h-[147px] ml-40 hidden sm:block mt-5'/>
    </div>
    <div className='bg-gray-100 rounded-lg lg:m-20 m-5 md:m-14 p-10 flex justify-center items-center text-center'>
       <div>
            <p className='text-2xl text-[#7B0323] font-bold'>Top FAQs</p>
            <p className='mt-4 text-gray-600'>Most frequently asked questions on Power Kiossk</p>
            {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-300 py-4"
        >
          <h3
            className="text-lg font-semibold cursor-pointer text-gray-800 flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span>
              {openIndex === index ? '-' : '+'}
            </span>
          </h3>
          {/* Conditionally render the answer if the question is clicked */}
          {openIndex === index && (
            <p className="mt-2 text-gray-600">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
       </div>
    </div>
    <div className='bg-[#FFE9EF] p-10 lg:m-20 md:m-14 m-5 rounded-lg flex justify-center items-center text-gray-700'>
        <div className='text-center'>
            <p className='lg:text-3xl text-xl font-bold'>Having difficulties finding what you need?</p>
            <div className='flex border p-5 font-light mt-10 border-gray-700 w-[300px] rounded-lg text-center lg:ml-40'>
                <img src={comment} className='w-5 h-5 mr-2 mt-1'/>
                <p>Contact our support team</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default FAQ