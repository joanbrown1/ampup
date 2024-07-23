import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChatBubble = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className={`sticky-widget ${isWidgetOpen ? 'open' : ''}`} ref={widgetRef}>
      
      <img src={gist} alt="Logo" onClick={toggleWidget} className="widget-logo"/>
    
    </div>
    </>
  )
}

export default ChatBubble