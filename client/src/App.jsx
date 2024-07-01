
import './App.css'
import MarketPlace from './components/MarketPlace'
import Navbar from './components/Navbar'
import CreateNFT from './components/CreateNFT'
import RegisterProperty from './components/RegisterProperty'

function App() {

  return (
    <>
      <Navbar/>
      <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen flex justify-center items-center pt-10">
        <MarketPlace/>
      </div>
     
   
    </>
  )
}

export default App
