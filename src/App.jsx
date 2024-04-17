import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from "../src/components/Navbar"
import Footer from './components/Footer'
import Router from "./Routing/Router"
import DashboardNav from './components/Dashboard/DashboardNav'
import { DataProvider } from './context/DataContext'

const App = () => {
  const location = useLocation()
  return (
    <>
    <DataProvider>
    {location.pathname === "/dashboard" ||
     location.pathname === "/buypower" ||
     location.pathname === "/power" ? <DashboardNav/> : <Navbar />}
      <Router />
    {location.pathname === "/dashboard" ||
     location.pathname === "/buypower" ? " " : <Footer />}
    </DataProvider>
    </>
  )
}

export default App