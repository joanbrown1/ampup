import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from "../src/components/Navbar"
import Footer from './components/Footer'
import Router from "./Routing/Router"
import DashboardNav from './components/Dashboard/DashboardNav'
import Contactnav from './components/contactnav'
import ChatBubble from './components/ChatBubble'
import { DataProvider } from './context/DataContext'

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isDashboardRoute = [
    "/dashboard",
    "/buypower",
    "/changemeter",
    "/requestbill",
    "/profile",
    "/changepassword",
    "/editprofile",
    "/chat"
  ].includes(path) || path.startsWith("/transaction");

  return (
    <DataProvider>
      {!isAdminRoute && (isDashboardRoute ? <DashboardNav /> : <Navbar />)}
      <Router />
      {!isAdminRoute && !isDashboardRoute && <Footer />}
      {!isAdminRoute && <Contactnav />}
      {!isAdminRoute && path !== "/chat" && <ChatBubble />}
    </DataProvider>
  )
}

export default App
