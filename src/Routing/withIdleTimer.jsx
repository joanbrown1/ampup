import React, { useState, useRef } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import "./timer.css"

const withIdleTimer = (WrappedComponent, timeout = 1000 * 60 * 5) => {
  return (props) => {
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false);
    const idleTimer = useRef(null);
    const warningTimeoutRef = useRef(null);

    const onIdle = () => {
      setShowWarning(true);
      warningTimeoutRef.current = setTimeout(() => {
        alert('You have been logged out due to inactivity.');
        localStorage.removeItem('adminData');
        navigate('/'); // Redirect to login page
      }, 1000 * 60 * 3); // 1 minute warning
    };

    const handleStayLoggedIn = () => {
      setShowWarning(false);
      clearTimeout(warningTimeoutRef.current);
      idleTimer.current.reset();
    };

    return (
      <IdleTimerProvider
        timeout={timeout - 1000 * 60} // 1 minute before warning
        onIdle={onIdle}
        debounce={500}
        ref={idleTimer}
      >
        {showWarning && (
          <div className="warning">
            <p>You will be logged out soon due to inactivity.</p>
            <button onClick={handleStayLoggedIn}>Stay Logged In</button>
          </div>
        )}
        <WrappedComponent {...props} />
      </IdleTimerProvider>
    );
  };
};

export default withIdleTimer;
