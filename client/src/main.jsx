import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {SignerProvider} from "./components/useWallet.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SignerProvider>
    <App />
    </SignerProvider>
  </React.StrictMode>,
)
