import React from "react";
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
import setting from "../../assets/settings.png"
import settingwhite from "../../assets/settingswhite.png"
import logo from "../../assets/ampup.png"
import { useNavigate } from 'react-router-dom'


const Side = () => {
  
  let navigate = useNavigate();
  const location = useLocation();

  
  return (
    <nav className="text-secondary w-side fixed top-0 p-4 pl-[37.46px] sm:block hidden bg-white h-screen shadow-2xl overflow-auto over">
      <div className="text-2xl font-poppins font-normal mb-4 flex mt-[15px] ">
        <img src={logo} alt="" className="w-24 mr-4 " onClick={()=>navigate("/")}/>
      </div>
      <ul className="font-medium text-sm ">
        <li>
          <NavLink
            to="/admin/customerchat"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/customerchat" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/customerchat" ?  <img src={whitechat} className="mr-4 w-6 h-6"/> :  <img src={chat} className="mr-4 w-6 h-6"/>}
            Chat
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/searchuser"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/searchuser" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/searchuser" ?  <img src={userswhite} className="mr-4 w-6 h-6"/> :  <img src={users} className="mr-4 w-6 h-6"/>}
            Users
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/transactionhistory"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/transactionhistory" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/transactionhistory" ?  <img src={historywhite} className="mr-4 w-6 h-6"/> :  <img src={history} className="mr-4 w-6 h-6"/>}
            History
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        {/* <li>
          <NavLink
            to="/admin/analysis"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/analysis" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/analysis" ?  <img src={historywhite} className="mr-4 w-6 h-6"/> :  <img src={history} className="mr-4 w-6 h-6"/>}
            Analysis
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/charges"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/charges" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/charges" ?  <img src={chargeswhite} className="mr-4 w-6 h-6"/> :  <img src={charges} className="mr-4 w-6 h-6"/>}
            Charges
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/permissions"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/permissions" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/permissions" ?  <img src={permissionswhite} className="mr-4 w-6 h-6"/> :  <img src={permissions} className="mr-4 w-6 h-6"/>}
            Permissions
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/discount"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/discount" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/discount" ?  <img src={discountwhite} className="mr-4 w-6 h-6"/> :  <img src={discount} className="mr-4 w-6 h-6"/>}
            Discount
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
        <li>
          <NavLink
            to="/admin/faq"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/faq" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/faq" ?  <img src={settingwhite} className="mr-4 w-6 h-6"/> :  <img src={setting} className="mr-4 w-6 h-6"/>}
            FAQ
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" /> */}
        <li>
          <NavLink
            to="/admin/changepassword"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/admin/changepassword" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/admin/changepassword" ?  <img src={settingwhite} className="mr-4 w-6 h-6"/> :  <img src={setting} className="mr-4 w-6 h-6"/>}
            Change Password
          </NavLink>
        </li>
        <hr className="w-[140px] my-2" />
       
      </ul>
      <Outlet />
    </nav>
  );
};

export default Side;
