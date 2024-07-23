import React from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import home from "../../assets/home.png"
import whitehome from "../../assets/homewhite.png"
import wallet from "../../assets/wallet.png"
import walletwhite from "../../assets/walletwhite.png"
import contact from "../../assets/contact.png"
import contactwhite from "../../assets/contactwhite.png"
import meter from "../../assets/meter.png"
import meterwhite from "../../assets/meterwhite.png"
import profile from "../../assets/user.png"
import profilewhite from "../../assets/userwhite.png"
import setting from "../../assets/settings.png"
import settingswhite from "../../assets/settingswhite.png"

const Footer = () => {
    const location = useLocation();

  return (
    <>
        <nav className="bg-primary p-4 lg:hidden bottom-0 shadow-2xl fixed w-full md:hidden">
            <div className='flex justify-center items-center space-x-10'>
                <NavLink
                to="/dashboard"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/dashboard" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/dashboard" ?  <img src={whitehome} className='w-6 h-6'/> :  <img src={home} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/buypower"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/buypower" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/buypower" ?  <img src={walletwhite} className='w-6 h-6'/> :  <img src={wallet} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/contactus"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/contactus" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/contact" ?  <img src={contactwhite} className='w-6 h-6'/> :  <img src={contact} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/changemeter"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/changemeter" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/changemeter" ?  <img src={meterwhite} className='w-6 h-6'/> :  <img src={meter} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/chat"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/chat" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/chat" ?  <img src={meterwhite} className='w-6 h-6'/> :  <img src={meter} className='w-6 h-6'/>}
                </NavLink>
                {/* <NavLink
                to="/profile"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/profile" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/profile" ?  <img src={profilewhite} className='w-6 h-6'/> :  <img src={profile} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/profile"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/settings" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/settings" ?  <img src={settingswhite} className='w-6 h-6'/> :  <img src={setting} className='w-6 h-6'/>}
                </NavLink> */}
            </div>
            <Outlet />
        </nav>
    </>
  )
}

export default Footer