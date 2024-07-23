import React from 'react'
import { useNavigate } from 'react-router-dom'
import bubble from "../assets/chatbubble.png"
import "./chatBubble.css"

const ChatBubble = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="sticky-widget">
      
      <img src={bubble} alt="Chat" onClick={() => navigate("/chat")} className="widget-logo"/>
    
    </div>
    </>
  )
}

export default ChatBubble