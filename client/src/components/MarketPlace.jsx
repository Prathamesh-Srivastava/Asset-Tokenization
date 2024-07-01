import React from 'react';

const MarketPlace = () => {
  return (
    <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-[27rem]">
        <div className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2">
          Available Offer
        </div>
        <div className="flex space-x-4 mb-4">
          <img src="mall.jpg" alt="Avenue Mall" className="w-40 h-50 object-cover rounded-md" /> {/* Replace with your image */}
          <div className='bg-[#1B2532] bg-opacity-91 p-4 rounded-lg mb-4 w-full'>
            <h3 className="text-xl font-semibold">Avenue Mall</h3>
            <p>Category:
            <br/> Commercial Office</p>
            <p>Location:
              <br/> Mumbai</p>
            <p>Share Type: 
              <br/>Equity</p>
          </div>
        </div>
        <p className="mb-4">Exciting opportunity in Mumbai’s vibrant real estate market: 5% equity in a prime mall available for INR 1 crore. Secure your stake in a high-traffic location poised for growth. Don’t miss out on this lucrative investment chance!</p>
        <div className="flex justify-between items-center mb-4">
        <p class="font-bold">5% EQUITY<br/> FOR SALE (1CR)</p>
        
          <p>OWNER NAME</p>
        </div>
        <button className="bg-gray-200 text-black py-2 px-4 rounded-full w-full">
          BUY
        </button>
      </div>
    </div>
  );
};

export default MarketPlace;
