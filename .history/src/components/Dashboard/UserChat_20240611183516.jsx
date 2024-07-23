import React, { useEffect, useState } from 'react';
import socket from '../CustomerCare/chat/socket';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import Footer from './footer';
import eye from "../../assets/eye.svg";
import ppp from "../../assets/ppp.png";
import chatuser from "../../assets/chatuser.png";
import "../CustomerCare/dashboard.css";

const UserChat = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConvoId, setCurrentConvoId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [newConvoReceiver, setNewConvoReceiver] = useState('');

    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));
    const userData = storedUserData;
    let meterno = userData.meternumber;
    let usermail = userData.email;

    useEffect(() => {
        const sender = { sender_email: usermail };

        const checkConvo = async () => {
            console.log('Running checkConvo');
            try {
                const response = await fetch('https://ampupserver.onrender.com/conversation/sender', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sender)
                });
                const data = await response.json();
                console.log('Response from conversation check:', data);
                if (data.convo_id) {
                    console.log('Existing conversation found:', data.convo_id);
                    fetchMessages(data.convo_id);
                } else {
                    console.log('No existing conversation found. Starting a new one.');
                    startNewConversation();
                }
            } catch (error) {
                console.error('Error checking conversation:', error);
            }
        };
        checkConvo();

        socket.on('newConversation', (newConvo) => {
            setConversations((prevConversations) => [...prevConversations, newConvo]);
        });

        socket.on('newMessage', (newMessage) => {
            if (newMessage.convo_id === currentConvoId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socket.off('newConversation');
            socket.off('newMessage');
        };
    }, [usermail]);

    const fetchMessages = async (convo_id) => {
        setCurrentConvoId(convo_id);
        const convo = { convo_id: convo_id };
        try {
            const response = await fetch('https://ampupserver.onrender.com/messages/convoid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(convo)
            });
            const data = await response.json();
            if (data.message === "No messages found for the provided email") {
                setMessages([]);
            } else {
                setMessages(data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        const newMessage = { convo_id: currentConvoId, message: input, sender_email: usermail };
        try {
            const response = await fetch('https://ampupserver.onrender.com/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });
            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, data]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const startNewConversation = async () => {
        const newConversation = { sender_email: usermail, receiver_email: "admin@powerplus.com" };
        try {
            const response = await fetch('https://ampupserver.onrender.com/conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newConversation)
            });
            const data = await response.json();
            setNewConvoReceiver('');
            setConversations((prevConversations) => [...prevConversations, data]);
            setCurrentConvoId(data.convo_id);
            setMessages([]);
        } catch (error) {
            console.error('Error starting new conversation:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 pb-20 pl-[223px] w-full h-full">
                    <div className='ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px]'>
                            <div className='flex'>
                                <img src={eye} className='w-[16px]' alt="eye icon"/>
                                <p className='text-sm font-light text-white pl-2'>Your Meter Number:</p>
                            </div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        <div className="bg-white w-[989px] p-10 mt-10 rounded-md">
                            <div className="h-full">
                                <div>
                                    <p className='ml-3 text-gray-700 italic'>Customer Care</p>
                                    <hr className='my-4'/>
                                </div>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex my-8 ${msg.sender_email === usermail ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender_email !== usermail && (
                                            <img src={chatuser} alt="chat user" className='mr-2 w-8 h-8' />
                                        )}
                                        <p className={`rounded-md p-2 ${msg.sender_email === usermail ? 'bg-blue-100' : 'bg-slate-50'}`}>
                                            {msg.message}
                                        </p>
                                        {msg.sender_email === usermail && (
                                            <img src={chatuser} alt="chat user" className='ml-2 w-8 h-8' />
                                        )}
                                    </div>
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
                    <div className='my-10'>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <div className='flex'>
                                <img src={eye} className='w-[16px]' alt="eye icon"/>
                                <p className='text-sm font-light text-white pl-1'>Your Meter Number:</p>
                            </div>
                            <p className='text-white text-3xl pt-4 px-4'>{meterno || "No Meter Number Saved Yet"}</p>
                        </div>
                        <div className="bg-white w-[328px] p-10 mt-10 rounded-md">
                            <div className="">
                                <div>
                                    <p className='ml-3 text-gray-700 italic'>Customer Care</p>
                                    <hr className='my-4'/>
                                </div>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex my-8 ${msg.sender_email === usermail ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender_email !== usermail && (
                                            <img src={chatuser} alt="chat user" className='mr-2 w-8 h-8' />
                                        )}
                                        <p className={`rounded-md p-2 ${msg.sender_email === usermail ? 'bg-blue-100' : 'bg-slate-50'}`}>
                                            {msg.message}
                                        </p>
                                        {msg.sender_email === usermail && (
                                            <img src={chatuser} alt="chat user" className='ml-2 w-8 h-8' />
                                        )}
                                    </div>
                                ))}
                                <div className='mt-auto'>
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
            <Footer />
        </div>
    );
};

export default UserChat;
