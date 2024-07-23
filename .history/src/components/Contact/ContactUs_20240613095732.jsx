import React, {useState, useEffect} from 'react'
import company from "../../assets/company.png"
import website from "../../assets/website.png"
import mail from "../../assets/mail1.png"
import location from "../../assets/location.png"
import phone from "../../assets/pphone.png"
import "../Home/home.css"

const ContactUs = () => {

        const [formData, setFormData] = useState({
          name: '',
          email: '',
          message: ''
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Here you can implement the logic to send the form data to your backend or perform any other action
          console.log(formData);
          // Clear the form after submission
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        };
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:p-20 p-10 bg-[#F4F4F4] m-4 lg:m-20 rounded-lg text-gray-600'>
        <div>
            <p className='font-bold lg:text-3xl text-2xl mb-1'>
                Contact Information
            </p>
            <p className='text-sm mb-14'>
                Don’t Hesitate To Contact Us For Any <br/>Kind Of Information.
            </p>
            <div className='flex my-8'>
                <img src={company} className='w-6 h-6 mr-4'/>
                <div className='text-sm'>
                    <p className='font-bold'>Company</p>
                    <p>Power Plus inc.</p>
                </div>
            </div>
            <div className='flex my-8'>
                <img src={mail} className='w-6 h-6 mr-4'/>
                <div>
                    <p>support@powerplus.ng</p>
                </div>
            </div>
            <div className='flex my-8'>
                <img src={website} className='w-6 h-6 mr-4'/>
                <div className='text-sm'>
                    <p className='font-bold'>Website</p>
                    <p>https://powerplus.ng</p>
                </div>
            </div>
            <div className='flex my-8'>
                <img src={phone} className='w-6 h-6 mr-4'/>
                <div className='text-sm'>
                    <p>0707 330 5599</p>
                </div>
            </div>
            <div className='flex my-8'>
                <img src={location} className='w-6 h-6 mr-4'/>
                <div className='text-sm'>
                    <p className='font-bold'>Address</p>
                    <p>Worldwide</p>
                </div>
            </div>
        </div>
        <div className='bg-[#FFE9EF] rounded-lg lg:p-10 p-5'>
            <p className='font-bold text-lg mb-2'>Get in touch</p>
            <p className='text-sm'>We'd love to hear from you</p>
            <form onSubmit={handleSubmit} className='my-10'>
                <div>
                <p className='text-xs'>Subject:</p>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="appearance-none border border-gray-300 rounded-md py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xs text-gray-600 placeholder-gray-400 w-full"
                    placeholder="The reason you're contacting us"
                />
                </div>
                <div>
                <p className='text-xs'>Email Address:</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="appearance-none border border-gray-300 rounded-md py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xs text-gray-600 placeholder-gray-400 w-full"
                    placeholder="The Email we can reach you at"
                    required
                />
                </div>
                <div>
                <p className='text-xs'>Message:</p>
                <textarea
                    id="message"
                    name="message"
                    className="w-full h-[200px] appearance-none border border-gray-300 rounded-md py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xs text-gray-600 placeholder-gray-400"
                    placeholder="Write us a message"
                    required
                />
                </div>
                <button type="submit"
                className='bg-[#7B0323] rounded-lg text-white p-4 hover:bg-white hover:text-[#7B0323]'>Send Message</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default ContactUs