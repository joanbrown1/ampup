import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home/Home"
import ContactUs from '../components/Contact/ContactUs';
import FAQ from '../components/FAQ/FAQ';
import Dashboard from '../components/Dashboard/Dashboard';
import BuyPower from '../components/Dashboard/BuyPower';
import SignUp from '../components/Registration/SignUp';
import Login from '../components/Registration/Login';
import CustomerCareLogin from '../components/CustomerCare/CustumerCareLogin';
import SearchUser from '../components/CustomerCare/SearchUser';
import User from '../components/CustomerCare/User';
import TransactionHistory from '../components/CustomerCare/TransactionHistory';
import Charges from '../components/CustomerCare/Charges';
import Permissions from '../components/CustomerCare/Permissions';
import Discount from '../components/CustomerCare/Discount';
import Transaction from '../components/Dashboard/Transaction';
import ChangeMeter from '../components/Dashboard/ChangeMeter';
import RequestBill from '../components/Dashboard/RequestBill';
import Profile from '../components/Dashboard/Profile';
import ChangePassword from '../components/Dashboard/ChangePassword';
import EditProfile from '../components/Dashboard/EditProfile';
import Analysis from '../components/CustomerCare/Analysis';
import Filter from '../components/CustomerCare/Filter';
import Chat from '../components/CustomerCare/chat/Chat';
import ChangeAdminPassword from '../components/CustomerCare/ChangeAdminPassword';
import UserChat from '../components/Dashboard/UserChat';


const Router = () => {
  return (
    <>
        <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buypower" element={<BuyPower />} />
            <Route path='/transaction/:ppid' element={<Transaction />} />
            <Route path='/changemeter' element={<ChangeMeter />} />
            <Route path='/requestbill' element={<RequestBill />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<UserChat />} />
            <Route path="/admin/customerchat" element={<Chat />} />
            <Route path='/admin/login' element={<CustomerCareLogin />} />
            <Route path='/admin/searchuser' element={<SearchUser />} />
            <Route path="/admin/user/:email" element={<User />} />
            <Route path="/admin/transactionhistory" element={<TransactionHistory />} />
            <Route path="/admin/charges" element={<Charges />} />
            <Route path="/admin/permissions" element={<Permissions />} />
            <Route path="/admin/discount" element={<Discount />} />
            <Route path="/admin/analysis" element={<Analysis />} />
            <Route path="/admin/filter/:date" element={<Filter />} />
            <Route path="/admin/changepassword" element={<ChangeAdminPassword />} />
        </Routes>
    </>
  )
}

export default Router