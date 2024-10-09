import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
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
import Fpassword from '../components/Registration/Fpassword';
import PrivacyPolicy from '../components/Policy/PrivacyPolicy';
import ReturnPolicy from '../components/Policy/ReturnPolicy';
import Faq from '../components/CustomerCare/Faq';
import withIdleTimer from './withIdleTimer'; // Import the HOC

const AdminChat = withIdleTimer(Chat);
const AdminLogin = withIdleTimer(CustomerCareLogin);
const AdminSearchUser = withIdleTimer(SearchUser);
const AdminUser = withIdleTimer(User);
const AdminTransactionHistory = withIdleTimer(TransactionHistory);
const AdminCharges = withIdleTimer(Charges);
const AdminPermissions = withIdleTimer(Permissions);
const AdminDiscount = withIdleTimer(Discount);
const AdminAnalysis = withIdleTimer(Analysis);
const AdminFilter = withIdleTimer(Filter);
const AdminChangePassword = withIdleTimer(ChangeAdminPassword);
const AdminFaq = withIdleTimer(Faq);

const Router = () => {
  return (
    <>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        {/* <Route path='/' element={<CustomerCareLogin />} /> */}
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
        <Route path="/forgotpassword" element={<Fpassword />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        {/* <Route path="/chat" element={<UserChat />} /> */}

        {/* <Route path="/admin/customerchat" element={<AdminChat />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path="/admin/changepassword" element={<AdminChangePassword />} />
        <Route path='/admin/searchuser' element={<AdminSearchUser />} />
        <Route path="/admin/user/:email" element={<AdminUser />} />
        <Route path="/admin/transactionhistory" element={<AdminTransactionHistory />} />

        <Route path="/admin/charges" element={<AdminCharges />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />
        <Route path="/admin/discount" element={<AdminDiscount />} />
        <Route path="/admin/analysis" element={<AdminAnalysis />} />
        <Route path="/admin/filter/:date" element={<AdminFilter />} />
        <Route path="/admin/faq" element={<AdminFaq />} />  */}
      </Routes>
    </>
  );
}

export default Router;
