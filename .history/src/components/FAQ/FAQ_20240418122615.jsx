import React, { useState } from 'react'
import faq from "../../assets/faq.png"
import down from "../../assets/down-arrow.png"
import cross from "../../assets/cross.png"
import comment from "../../assets/comment.png"

const FAQ = () => {

    const [questions, setQuestions] = useState(" ");


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
            <p className='mt-4 text-gray-600'>Most frequently asked questions on Power Plus</p>
            <div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "1" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>What is Power Plus?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>Power Plus simplifies utility payments, offering an all-in-one solution for electricity and more. With our secure platform, you can manage transactions effortlessly and gain full control over your finances. Join us in embracing the future of payments with Power Plus.</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>What is Power Plus?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("1")}}/>
                        </div>
                    }
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "2" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>What do I need to register?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>All you need to register is your Email address and phone number</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>What do I need to register?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("2")}}/>
                        </div>
                    }
                </div>
                <div>
                    <p>Payments and Bills</p>
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "3" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>What Payment Options Are Available?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>You can make payments using either;<br/>Debit card, USSD, Bank Transfer, Visa qr</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>What Payment Options Are Available?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("3")}}/>
                        </div>
                    }
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "4" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>My Transaction Failed But I Was Debited</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>Please ensure you contact our 24-hour support team by chatting us on our Live-chat platform or by sending a mail to support@ampup.com immediately you experience this.<br/>Usually you should get an auto-reversal of the payment from your bank within 24 hours</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>My Transaction Failed But I Was Debited</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("4")}}/>
                        </div>
                    }
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "5" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>Do I Pay Additional Fees For Using Power Plus?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>For airtime and data recharges you do not pay additional fees. But for other services, you will be charged a convenience per transaction except you are a partner with us. For info on how to partner, visit https://vtpass.com/partners.</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>Do I Pay Additional Fees For Using Power Plus?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("5")}}/>
                        </div>
                    }
                </div>
                <div>
                    <p>FAQS ON METER LOADING</p>
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "6" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>Why Do I Have Debt On My Meter?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>This could arise as a result of one of the following reasons;<br/>Your meter is a newly installed meter. The cost for the free units given is paid by customer as (debt) on customer’s first recharge of the meter.<br/>Transfer of Previous Debt: If customer was previously using an analog meter before the installation of a Prepaid meter, or using the estimated billing (Post Paid) and there was a debt before the installation of the prepaid meter, the debt on the estimated (Postpaid) billing account is migrated to the Prepaid meter account.<br/>The debt is a penalty for bypass or illegal connection discovered by the distribution company.<br/>We advise you visit or call your electric distribution company for better clarity.</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>Why Do I Have Debt On My Meter?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("6")}}/>
                        </div>
                    }
                </div>
                <div className='bg-white text-left p-4 rounded-lg shadow-md lg:w-[1000px] w-[300px] md:w-[500px] my-8'>
                    {
                        questions === "7" ?
                        <div>
                            <div className='flex px-6'>
                                <p className='text-sm'>I Purchased Token Using a Wrong Meter Number, Can It Be Transferred?</p>
                                <img src={cross} className='ml-auto w-6 h-6' onClick={() => {setQuestions(" ")}} />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 text-left mt-4 px-10'>No, it cannot. Token is generated and encrypted using the meter number used. This means that token once generated can only be used by the specific meter. A transfer is impossible.</p>
                            </div>
                        </div>
                        : 
                        <div className='flex px-6'>
                            <p className='text-sm'>I Purchased Token Using a Wrong Meter Number, Can It Be Transferred?</p>
                            <img src={down} className='ml-auto w-6 h-6' onClick={() => {setQuestions("7")}}/>
                        </div>
                    }
                </div>
            </div>
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