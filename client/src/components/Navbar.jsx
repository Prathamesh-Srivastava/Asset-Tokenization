
import React from "react";
import { ConnectButton, SignerProvider } from "./useWallet";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="bg-none text-white py-4 px-8 flex justify-between items-center fixed top-0 w-full">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="Logo" className="h-8" /> {/* Replace with your logo */}
          <div className="flex space-x-16"> {/* Container for navigation links */}
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/marketplace" className="hover:text-gray-300">MarketPlace</Link>
            <Link to="/register" className="hover:text-gray-300">RegisterProperty</Link>
          </div>
        </div>
        <ConnectButton />
      </nav>
  );
};

export default Navbar;
