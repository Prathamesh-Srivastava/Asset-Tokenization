import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import RegisterProperty from './components/RegisterProperty'
import Dashboard from './components/Dashboard'
import MarketPlaceProps from './components/MarketPlaceProps'
import SideBar from './components/SideBar'
import { useState } from 'react'

function App() {

  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <>
      {/* <Navbar/>
      <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen flex justify-center items-center pt-10">
        <MarketPlace/>
      </div> */}
      <BrowserRouter>
      <div className="app-container " style={{
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(to bottom, black, #000046 80%, #162a63)",
        backgroundAttachment: "fixed",
      }}>
        <SideBar/>
        <div style={{
          marginLeft: "280px",
          width: "100%",
          position: "initial"
        }}>
          <Navbar setWalletConnected={setWalletConnected}/>
          <Routes>
          <Route path="/" element={<Dashboard walletConnected={walletConnected}/>} />
              <Route path="/marketplace" element={<MarketPlaceProps />} />
              <Route path="/register" element={<RegisterProperty />} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>

     
   
    </>
  )
}

export default App
