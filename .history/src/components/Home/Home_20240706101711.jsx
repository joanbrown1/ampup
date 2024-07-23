import React, {useState} from 'react'
import { HiMail, HiEye, HiEyeOff} from 'react-icons/hi';
import { useAuth } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import { PaystackButton } from 'react-paystack'
import "./home.css"
import arm from "../../assets/arm.png"
import armsm from "../../assets/armsm.png"
import speed from "../../assets/time.png"
import click from "../../assets/one.png"
import secure from "../../assets/secure.png"
import orange from "../../assets/orange.png"
import green from "../../assets/green.png"
import yellow from "../../assets/yellow.png"
import blue from "../../assets/blue.png"
import purple from "../../assets/purple.png"
import white from "../../assets/white.png"
import history from "../../assets/history.png"
import innovation from "../../assets/innovation.png"
import payw from "../../assets/payw.png"
import paywsm from "../../assets/paymentw.jpg"
import smile from "../../assets/paym.png"
import android from "../../assets/andriod.png"
import apple from "../../assets/apple.png"
import PageLoader from "./PageLoader"

const Home = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Loading");
    setError(""); // Clear previous errors
  
    try {
      let bodyContent = JSON.stringify({
        "email": formData.email,
        "password": formData.password
      });
  
      let response = await fetch("https://ampupserver.onrender.com/api/authUser", {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      let data = await response.json();
  
      if (response.ok) { // Check if response is successful
        const user = data.data.user;
        if (user) {
          const authUserData = user;
          localStorage.setItem('authUserData', JSON.stringify(authUserData));
          login(authUserData);
          navigate("/buypower");
        } else {
          setError("Invalid email or password"); // Handle invalid credentials
        }
      } else {
        setError(data.message || "An error occurred"); // Handle other errors
      }
  
      setFormData({
        email: "",
        password: ""
      });
  
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred"); // Generic error message for unexpected errors
    }
  
    setMessage(""); // Clear loading message
  };
  

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='items-center'>
        <PageLoader/>
      </div>
    </>
  )
}

export default Home