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

    const fetchMessages = (convo_id) => {
        setCurrentConvoId(convo_id);
        const convoid = { convo_id: currentConvoId };
        fetch('https://ampupserver.onrender.com/messages/convoid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(convoid)
        })
            .then(response => response.json())
            .then(data => setMessages(data))
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
            <Side/>
            <div>
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 pb-20 pl-[223px] w-full h-full">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <div className="bg-white w-[989px] p-10 mt-10 rounded-md grid-cols-9 grid"> 
                            <div className="col-span-6 flex flex-col justify-between h-full">
                                <div>
                                <p className='ml-3 text-gray-700 italic'>User: thisuser@gmail.com</p>
                                <hr/>
                                </div>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 rounded-md p-2 bg-slate-50'>Something pretting confusing the user is asking about</p>
                                </div>
                                <div className="flex my-8">
                                <p className='rounded-md p-2 bg-slate-50'>A educated replay to the Something pretting confusing the user is asking about</p>
                                <img src={chatuser} alt="" className='ml-2 w-8 h-8' />
                                </div>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 rounded-md p-2 bg-slate-50'>Something pretting confusing the user is asking about</p>
                                </div>
                                <div className="flex my-8">
                                <p className='rounded-md p-2 bg-slate-50'>A educated replay to the Something pretting confusing the user is asking about</p>
                                <img src={chatuser} alt="" className='ml-2 w-8 h-8' />
                                </div>
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
                            <div className='col-span-3 ml-20 p-2 bg-gray-50'>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 break-words w-[150px]'>testing@gmail.com</p>
                                </div>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 break-words w-[150px]'>testing@gmail.com</p>
                                </div>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 break-words w-[150px]'>testing@gmail.com</p>
                                </div>
                                <div className="flex my-8">
                                <img src={chatuser} alt="" className='w-8 h-8'/>
                                <p className='ml-2 break-words w-[150px]'>testingksdjkljsdkjjasdkjj@gmail.com</p>
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