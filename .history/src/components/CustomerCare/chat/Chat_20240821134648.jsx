import React, { useEffect, useState } from 'react';
import socket from './socket';
import { useNavigate } from 'react-router-dom'
import Side from '../Side'
import Foot from '../Foot'
import chatuser from "../../../assets/chatuser.png"
import "../dashboard.css"

const Chat = () => {

    const [conversations, setConversations] = useState([]);
    const [currentConvoId, setCurrentConvoId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mail, setMail] = useState('');
    const [newConvoReceiver, setNewConvoReceiver] = useState('');

    const adminData = JSON.parse(localStorage.getItem('adminData'));

    useEffect(() => {
        // Fetch initial conversations
        fetch('https://api.powerkiosk.ng/api/conversations')
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
        fetch('https://api.powerkiosk.ng/api/messages/convoid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(convo)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === 'No messages found for the provided convo_id') {
                    setMessages([]);
                } else {
                    setMessages(data)   
                }
                
            })
            .catch(error => console.error(error));
    };

    const sendMessage = () => {
        const newMessage = { convo_id: currentConvoId, message: input, sender_email: 'admin@powerplus.com' };
        fetch('https://api.powerkiosk.ng/api/message', {
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const clearChat = async () => {
        console.log(currentConvoId);
        let headersList = {
            "Accept": "*/*"
        }
        
        let response = await fetch("https://api.powerkiosk.ng/api/messages/"+currentConvoId, { 
          method: "DELETE",
          headers: headersList
        });
        
        let data = await response.text();
        console.log(data);
        fetchMessages(currentConvoId, mail);
        
    };

    // const startNewConversation = () => {
    //     const newConversation = { sender_email: 'your_email@example.com', receiver_email: newConvoReceiver };
    //     fetch('https://api.powerkiosk.ng/api/conversation', {
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
        <div className='mb-[30px] lg:grid lg:grid-cols-12'>
            <div className='lg:col-span-2'>
                <Side/>
            </div>
            <div className='lg:col-span-10'>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 w-full h-full pb-10">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-full h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, {adminData.email} ({adminData.privilage})</p>
                        </div>
                        <div className="bg-white w-[989px] p-10 mt-10 rounded-md grid-cols-9 grid"> 
                            <div className="col-span-6 h-full">
                                <div className="flex mb-5">
                                    <div>
                                        <p className='ml-3 text-gray-700 italic'>User: {mail ? mail : "Please select user"}</p>
                                        <hr/>
                                    </div>
                                    <div className='text-secondary ml-auto cursor-pointer underline hover:text-black underline-offset-2'
                                    onClick={()=>{clearChat()}}>
                                        Clear chat
                                    </div>
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
                                    onKeyDown={handleKeyDown}
                                    style={{ fontSize: '0.8rem', height: '60px' }}
                                    className="py-2 pl-3 pr-3 block w-full border-2 rounded-xl border-gray-300 focus:outline-none focus:border-[#7B0323] hover:border-[#7B0323] mr-5"
                                />
                                <button onClick={sendMessage} className='text-secondary hover:text-black'>
                                    Send
                                </button>
                                </div>
                            </div>
                            <div className='col-span-3 ml-20 p-2 bg-gray-50'>
                                <div>
                                    <p className='ml-3 text-gray-700 italic pb-1'>Users</p>
                                    <hr/>
                                </div>
                                {conversations.map((convo) => (
                                    <div key={convo.convo_id} className="flex my-8"
                                     onClick={() => fetchMessages(convo.convo_id, convo.sender_email)}>
                                        <img src={chatuser} alt="" className='w-8 h-8'/>
                                        <p className='ml-2 break-words w-[150px] hover:text-secondary'>{convo.sender_email}</p>
                                    </div>
                                ))}
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className="lg:hidden md:hidden bg-[#F3F3F3] w-full h-screen flex justify-center">
                    <div className='my-10 '>
                        <div className='mobg w-[328px] h-[179px] rounded-md pl-[16px] pt-[28px]'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <p className='text-secondary my-10 italic text-lg'>Kindly view with desktop</p>
                    </div>
                </div>
            </div>
            <Foot/>
        </div>
    </>
  )
}

export default Chat