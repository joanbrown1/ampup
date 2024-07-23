import React, { useEffect, useState } from 'react';
import socket from './socket';
import { useNavigate } from 'react-router-dom'
import Side from '../Side'
import Foot from '../Foot'
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
                <div className="sm:block hidden bg-[#F3F3F3] pt-10 ml-[223px] w-full h-full">
                    <div className=' ml-6'>
                        <p className='text-lg font-medium mb-4'>Chat</p>
                        <div className='newbg w-[989px] h-[175px] pl-[87.61px] pt-[49px] mb-10'>
                            <p className='text-white text-3xl pt-4 px-4'>Welcome, Admin</p>
                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 mt-6 ">
                        <div>
                                <div>
                                    <h2>Conversations</h2>
                                    {conversations.map((convo) => (
                                        <div key={convo.convo_id} onClick={() => fetchMessages(convo.convo_id)}>
                                            {convo.sender_email} & {convo.receiver_email}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h2>Messages</h2>
                                    {messages.map((msg, index) => (
                                        <div key={index}>{msg.message}</div>
                                    ))}
                                </div>
                                <div>
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <button onClick={sendMessage}>Send</button>
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