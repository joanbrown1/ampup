import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import home from "../../assets/home.png"
import whitehome from "../../assets/homewhite.png"
import wallet from "../../assets/wallet.png"
import walletwhite from "../../assets/walletwhite.png"
import contact from "../../assets/contact.png"
import contactwhite from "../../assets/contactwhite.png"
import meter from "../../assets/meter.png"
import meterwhite from "../../assets/meterwhite.png"
import bill from "../../assets/bill.png"
import billwhite from "../../assets/billwhite.png"
import profile from "../../assets/user.png"
import profilewhite from "../../assets/userwhite.png"
import setting from "../../assets/settings.png"
import share from "../../assets/share.png"
import shatewhite from "../../assets/sharewhite.png"
import chat from "../../assets/chat.png"
import chatwhite from "../../assets/chatwhite.png"
import logoutwhite from "../../assets/logoutwhit.png"
import log from "../../assets/logout.png"
import settingswhite from "../../assets/settingswhite.png"
import logo from "../../assets/ampup.png"
import { useNavigate } from 'react-router-dom'
import "./dashboard.css"

const SmSidebar = () => {

    const location = useLocation();
    let navigate = useNavigate();

    const handleShare = () => {
        // Check if the Web Share API is supported
        if (navigator.share) {
          // Use Web Share API if supported
          navigator.share({
            title: 'Share site',
            text: 'Recharge your electric meter with ease here!',
            url: 'https://powerkiosk.ng',
          }).then(() => {
            console.log('Successfully shared');
          }).catch(error => {
            console.error('Error sharing:', error);
            // Fallback for errors (optional)
            alert('Error sharing content. Please try again.');
          });
        } else {
          // Fallback for browsers that do not support Web Share API
          const url = 'https://powerkiosk.ng';
          
          // Check if the device is mobile
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          // If the device is mobile, try to open the share intent link for WhatsApp
          if (isMobile) {
            // Replace 'whatsapp://send' with the appropriate WhatsApp deep link
            window.location.href = `whatsapp://send?text=${encodeURIComponent(url)}`;
          } else {
            // Fallback for non-mobile devices
            alert('Please use a mobile device to share this content.');
          }
        }
      };

      const logout = () => {
        localStorage.removeItem('authUserData');
        navigate('/login')
      }


  return (
    <nav className=" text-black w-[250px] p-4 pl-[37.46px]  shadow-xl lg:hidden h-screen">
      <div className="text-2xl font-poppins font-normal mb-4 flex ">
        <img src={logo} alt="" className="w-28 mr-4 " onClick={()=>navigate("/")}/>
      </div>
      <ul className="font-medium text-sm ">
        <li>
          <NavLink
            to="/buypower"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/buypower" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/buypower" ?  <img src={walletwhite} className="mr-2 w-4 h-4"/> :  <img src={wallet} className="mr-2 w-4 h-4"/>}
            Buy Electricity
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/dashboard"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/dashboard" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/dashboard" ?  <img src={whitehome} className="mr-2 w-4 h-4"/> :  <img src={home} className="mr-2 w-4 h-4"/>}
            Transactions
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/changemeter"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/changemeter" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/changemeter" ?  <img src={meterwhite} className="mr-2 w-4 h-4"/> :  <img src={meter} className="mr-2 w-4 h-4"/>}
            Meter Number
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/requestbill"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/requestbill" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/requestbill" ?  <img src={billwhite} className="mr-2 w-4 h-4"/> :  <img src={bill} className="mr-2 w-4 h-4"/>}
            Request Bill
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/profile"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/profile" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/profile" ?  <img src={profilewhite} className="mr-2 w-4 h-4"/> :  <img src={profile} className="mr-2 w-4 h-4"/>}
            Profile
          </NavLink>
        </li>

        {/* <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/chat"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/chat" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/chat" ?  <img src={chatwhite} className="mr-2 w-4 h-4"/> :  <img src={chat} className="mr-2 w-4 h-4"/>}
            Customer Care
          </NavLink>
        </li> */}

        {/* <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/changepassword"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/changepassword" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/changepassword" ?  <img src={settingswhite} className="mr-2 w-4 h-4"/> :  <img src={setting} className="mr-2 w-4 h-4"/>}
            Change Password
          </NavLink>
        </li> */}
        
        {/* <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/editprofile"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/editprofile" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/editprofile" ?  <img src={settingswhite} className="mr-2 w-4 h-4"/> :  <img src={setting} className="mr-2 w-4 h-4"/>}
            Edit Profile
          </NavLink>
        </li> */}
        <hr className="w-[140px] my-4" />
        <li>
          <NavLink
            to="/contactus"
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "/contactus" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "/contactus" ?  <img src={contactwhite} className="mr-2 w-4 h-4"/> :  <img src={contact} className="mr-2 w-4 h-4"/>}
            Contact Us
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li onClick={handleShare}>
          <NavLink
            to=""
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "" ?  <img src={shatewhite} className="mr-2 w-4 h-4"/> :  <img src={share} className="mr-2 w-4 h-4"/>}
            Share
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
        <li onClick={logout}>
          <NavLink
            to=""
            className={`p-2 mb-1 hover:bg-secondary hover:text-primary rounded-lg transition-all flex ${
              location.pathname === "" ? "bg-secondary text-white" : ""
            }`}
          >
           {location.pathname === "" ?  <img src={logoutwhite} className="mr-2 w-4 h-4"/> :  <img src={log} className="mr-2 w-4 h-4"/>}
            Logout
          </NavLink>
        </li>
        <hr className="w-[140px] my-4" />
      </ul>
      <Outlet />
    </nav>
  )
}

export default SmSidebar