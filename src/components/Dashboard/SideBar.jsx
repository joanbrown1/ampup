import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import home from "../../assets/home.png"
import whitehome from "../../assets/homewhite.png"
import wallet from "../../assets/wallet.png"
import walletwhite from "../../assets/walletwhite.png"
import profile from "../../assets/user.png"
import profilewhite from "../../assets/userwhite.png"
import setting from "../../assets/settings.png"
import settingswhite from "../../assets/settingswhite.png"
import logo from "../../assets/ampup.png"
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {
  
  let navigate = useNavigate();
  const location = useLocation();

  
  return (
    <nav className=" text-black w-sidebar fixed top-0 p-4 pl-[37.46px] sm:block hidden bg-white h-screen shadow-2xl">
      <div className="text-2xl font-poppins font-normal mb-4 flex mt-[15px] ">
        <img src={logo} alt="" className="w-24 mr-4 " onClick={()=>navigate("/")}/>
      </div>
      <ul className="font-medium text-base mt-[25px]">
        <li>
          <NavLink
            to="/dashboard"
            className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/dashboard" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/dashboard" ?  <img src={whitehome} className="mr-4 w-6 h-6"/> :  <img src={home} className="mr-4 w-6 h-6"/>}
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/buypower"
            className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/buypower" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/buypower" ?  <img src={walletwhite} className="mr-4 w-6 h-6"/> :  <img src={wallet} className="mr-4 w-6 h-6"/>}
            Buy Power
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/profile"
            className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/profile" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/profile" ?  <img src={profilewhite} className="mr-4 w-6 h-6"/> :  <img src={profile} className="mr-4 w-6 h-6"/>}
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={`p-2 mb-2 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/settings" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/settings" ?  <img src={settingswhite} className="mr-4 w-6 h-6"/> :  <img src={setting} className="mr-4 w-6 h-6"/>}
            Settings
          </NavLink>
        </li> */}
       
      </ul>
      <Outlet />
    </nav>
  );
};

export default Sidebar;
