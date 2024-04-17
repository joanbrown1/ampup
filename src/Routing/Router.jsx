import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home/Home"
import ContactUs from '../components/Contact/ContactUs';
import FAQ from '../components/FAQ/FAQ';
import Dashboard from '../components/Dashboard/Dashboard';
import BuyPower from '../components/Dashboard/BuyPower';
import SignUp from '../components/Registration/SignUp';
import Login from '../components/Registration/Login';


const Router = () => {
  return (
    <>
        <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buypower" element={<BuyPower />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default Router