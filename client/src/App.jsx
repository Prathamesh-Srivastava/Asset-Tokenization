import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MarketPlace from './components/MarketPlace'
import Navbar from './components/Navbar'
import RegisterProperty from './components/RegisterProperty'
import Dashboard from './components/Dashboard'
import MarketPlaceProps from './components/MarketPlaceProps'

function App() {

  return (
    <>
      {/* <Navbar/>
      <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen flex justify-center items-center pt-10">
        <MarketPlace/>
      </div> */}
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Dashboard />} />
            <Route path="/marketplace" element={<MarketPlaceProps />} />
            <Route path="/register" element={<RegisterProperty />} />
        </Routes>
      </BrowserRouter>

     
   
    </>
  )
}

export default App
