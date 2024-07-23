import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from "../src/components/Navbar"
import Footer from './components/Footer'
import Router from "./Routing/Router"
import DashboardNav from './components/Dashboard/DashboardNav'
import Contactnav from './components/contactnav'
import { DataProvider } from './context/DataContext'

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
    <DataProvider>
    
      {!isAdminRoute && (
        location.pathname === "/dashboard" ||
        location.pathname === "/buypower" ||
        location.pathname === "/changemeter" ||
        location.pathname === "/requestbill" ||
        location.pathname === "/profile" ||
        location.pathname === "/changepassword" ||
        location.pathname === "/editprofile" ||
        location.pathname === "/chat" ||
        location.pathname.startsWith("/transaction")
        ? <DashboardNav />
        : <Navbar />
      )}
      <Router />
    {location.pathname === "/dashboard" ||
    location.pathname === "/buypower" ||
    location.pathname === "/changemeter" ||
    location.pathname === "/requestbill" ||
    location.pathname === "/profile" ||
    location.pathname === "/changepassword" ||
    location.pathname === "/editprofile" ||
    location.pathname === "/chat" ||
    location.pathname.startsWith("/transaction") ||
    isAdminRoute  ? " " : <Footer />}
    {!isAdminRoute && <Contactnav />}
    </DataProvider>
    </>
  )
}

export default App