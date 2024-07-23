import React, { useEffect, useState } from 'react';
import socket from '../CustomerCare/chat/socket';
import { useNavigate } from 'react-router-dom'
import Sidebar from './SideBar'
import Footer from './footer'
import eye from "../../assets/eye.svg"
import ppp from "../../assets/ppp.png"
import chatuser from "../../assets/chatuser.png"
import "../CustomerCare/dashboard.css"

const UserChat = () => {

    const [conversations, setConversations] = useState([]);
    const [currentConvoId, setCurrentConvoId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mail, setMail] = useState('');
    const [newConvoReceiver, setNewConvoReceiver] = useState('');

    useEffect(() => {
        // Fetch initial conversations
        fetch('https://ampupserver.onrender.com/conversations')
            .then(response => response.json())
            .then(data => setConversations(data))
            .catch(error => console.error(error));

        // Listen for new conversations
        socket.on('newConversation', (newConvo) => {
            setConversations((prevConversations) => [...prevConversations, newConvo]);
        });

        // Listen for new messages
        socket.on('newMessage', (newMessage) => {
            if (newMessage.convo_id === currentConvoId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socket.off('newConversation');
            socket.off('newMessage');
        };
    }, [currentConvoId]);

    const fetchMessages = (convo_id, sender_email) => {
        setMail(sender_email);
        setCurrentConvoId(convo_id);
        console.log(currentConvoId);
        const convo = { convo_id: convo_id };
        fetch('https://ampupserver.onrender.com/messages/convoid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(convo)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "No messages found for the provided email") {
                    setMessages([]);
                } else {
                    setMessages(data)   
                }
                
            })
            .catch(error => console.error(error));
    };

    const sendMessage = () => {
        const newMessage = { convo_id: currentConvoId, message: input, sender_email: 'admin@powerplus.com' };
        fetch('https://ampupserver.onrender.com/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        })
            .then(response => response.json())
            .then(data => {
                setMessages((prevMessages) => [...prevMessages, data]);
                setInput('');
            })
            .catch(error => console.error(error));
    };

    // const startNewConversation = () => {
    //     const newConversation = { sender_email: 'your_email@example.com', receiver_email: newConvoReceiver };
    //     fetch('https://ampupserver.onrender.com/conversation', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newConversation)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setNewConvoReceiver('');
    //             setConversations((prevConversations) => [...prevConversations, data]);
    //             setCurrentConvoId(data.convo_id);
    //             setMessages([]);
    //         })
    //         .catch(error => console.error(error));
    // };

    
    
  return (
    <>
        <div className=''>
            <Sidebar/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 pb-20 pl-[223px] w-full h-full">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <div className="bg-white w-[989px] p-10 mt-10 rounded-md "> 
                            <div className=" h-full">
                                <div>
                                    <p className='ml-3 text-gray-700 italic'>Customer Care</p>
                                    <hr className='my-4'/>
                                </div>
                                {messages.map((msg, index) => (
                                <>
                                    <div
                                            key={index}
                                            className={`flex my-8 ${msg.sender_email === "admin@powerplus.com" ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {msg.sender_email !== "admin@powerplus.com" && (
                                                <img src={chatuser} alt="" className='mr-2 w-8 h-8' />
                                            )}
                                            <p className={`rounded-md p-2 bg-slate-50 ${msg.sender_email === "admin@powerplus.com" ? 'bg-blue-100' : 'bg-slate-50'}`}>
                                                {msg.message}
                                            </p>
                                            {msg.sender_email === "admin@powerplus.com" && (
                                                <img src={chatuser} alt="" className='ml-2 w-8 h-8' />
                                            )}
                                        </div>
                                </>
                                ))}
                                <div className='flex mt-auto'>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                    className="py-2 pl-3 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323] mr-5"
                                />
                                <button onClick={sendMessage} className='text-secondary hover:text-black'>
                                    Send
                                </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center">
                    <div className='my-10 '>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <div className="bg-white w-[328px] p-10 mt-10 rounded-md "> 
                            <div className=" ">
                                <div>
                                    <p className='ml-3 text-gray-700 italic'>Customer Care</p>
                                    <hr className='my-4'/>
                                </div>
                                {messages.map((msg, index) => (
                                <>
                                    <div
                                            key={index}
                                            className={`flex my-8 ${msg.sender_email === "admin@powerplus.com" ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {msg.sender_email !== "admin@powerplus.com" && (
                                                <img src={chatuser} alt="" className='mr-2 w-8 h-8' />
                                            )}
                                            <p className={`rounded-md p-2 bg-slate-50 ${msg.sender_email === "admin@powerplus.com" ? 'bg-blue-100' : 'bg-slate-50'}`}>
                                                {msg.message}
                                            </p>
                                            {msg.sender_email === "admin@powerplus.com" && (
                                                <img src={chatuser} alt="" className='ml-2 w-8 h-8' />
                                            )}
                                        </div>
                                </>
                                ))}
                                <div className=' mt-auto'>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                    className="py-2 pl-3 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323] mr-5"
                                />
                                <button onClick={sendMessage} className='text-secondary hover:text-black mt-3'>
                                    Send
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default UserChat