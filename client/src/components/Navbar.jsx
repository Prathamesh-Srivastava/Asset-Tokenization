// import React from 'react';

// const Navbar = () => {
//   return (
//     <div className="w-full h-screen flex flex-col bg-custom-gradient">
//       <nav className="bg-none text-white py-4 px-8 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <img src="logo.png" alt="Logo" className="h-8" /> {/* Replace with your logo */}
//           <div className="flex space-x-16"> {/* Container for navigation links */}
//             <a href="#investment" className="hover:text-gray-300">Investment</a>
//             <a href="#marketplace" className="hover:text-gray-300">MarketPlace</a>
//             <a href="#portfolio" className="hover:text-gray-300">Portfolio</a>
//           </div>
//         </div>
//       </nav>
//       <div className="flex-grow bg-custom-gradient flex justify-center items-center">
//         {/* Content for the main section with custom gradient background */}
//         <h1 className="text-white text-4xl font-bold">Welcome to our Real Estate Portal</h1>
//         {/* Add more content as needed */}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";
import { ConnectButton, SignerProvider } from "./useWallet";

const Navbar = () => {
  return (
    <SignerProvider>
      <nav className="bg-none text-white py-4 px-8 flex justify-between items-center fixed top-0 w-full">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="Logo" className="h-8" /> {/* Replace with your logo */}
          <div className="flex space-x-16"> {/* Container for navigation links */}
            <a href="#investment" className="hover:text-gray-300">Investment</a>
            <a href="#marketplace" className="hover:text-gray-300">MarketPlace</a>
            <a href="#portfolio" className="hover:text-gray-300">Portfolio</a>
          </div>
        </div>
        <ConnectButton />
      </nav>
    </SignerProvider>
  );
};

export default Navbar;
