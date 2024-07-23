import React from 'react'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import chat from "../../assets/chat.png"
import whitechat from "../../assets/chatwhite.png"
import users from "../../assets/users.png"
import userswhite from "../../assets/userswhite.png"
import history from "../../assets/histori.png"
import historywhite from "../../assets/hiswhite.png"
import charges from "../../assets/charges.png"
import chargeswhite from "../../assets/chargeswhite.png"
import permissions from "../../assets/permissions.png"
import permissionswhite from "../../assets/perssionswhite.png"
import discount from "../../assets/discount.png"
import discountwhite from "../../assets/discountwhite.png"

const Foot = () => {
    const location = useLocation();

  return (
    <>
        <nav className="bg-primary p-4 lg:hidden bottom-0 shadow-2xl fixed w-full md:hidden mb-[30px]">
            <div className='flex justify-center items-center space-x-10'>
                {/* <NavLink
                to="/admin/customerchat"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/customerchat" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/customerchat" ?  <img src={whitechat} className='w-6 h-6'/> :  <img src={chat} className='w-6 h-6'/>}
                </NavLink> */}
                <NavLink
                to="/admin/searchuser"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/searchuser" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/searchuser" ?  <img src={userswhite} className='w-6 h-6'/> :  <img src={users} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/admin/transactionhistory"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/transactionhistory" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/transactionhistory" ?  <img src={historywhite} className='w-6 h-6'/> :  <img src={history} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/admin/charges"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/charges" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/charges" ?  <img src={chargeswhite} className='w-6 h-6'/> :  <img src={charges} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/admin/permissions"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/permissions" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/permissions" ?  <img src={permissionswhite} className='w-6 h-6'/> :  <img src={permissions} className='w-6 h-6'/>}
                </NavLink>
                <NavLink
                to="/admin/discount"
                className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-full transition-all flex ${
                location.pathname === "/admin/discount" ? "bg-secondary text-white" : ""
                }`}
                >
                    {location.pathname === "/admin/discount" ?  <img src={discountwhite} className='w-6 h-6'/> :  <img src={discount} className='w-6 h-6'/>}
                </NavLink>
            </div>
            <Outlet />
        </nav>
    </>
  )
}

export default Foot