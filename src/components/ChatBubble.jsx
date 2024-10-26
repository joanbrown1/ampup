import React from 'react';
import { useNavigate } from 'react-router-dom';
import bubble from "../assets/chatbubble.png";
import "./chatBubble.css";

const ChatBubble = () => {
  const navigate = useNavigate();

  const storedUserData = JSON.parse(localStorage.getItem('authUserData'));
  const userData = storedUserData || {};
  const usermail = userData.email;

  const openChat = () => {
    if (usermail) {
        navigate("/chat");
    } else {
        navigate("/login");
    }
  };

  return (
    <>
      <div className="sticky-widget">
        <img src={bubble} alt="Chat" onClick={openChat} className="widget-logo" />
      </div>
    </>
  );
};

export default ChatBubble;
