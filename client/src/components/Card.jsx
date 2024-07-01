import React from 'react';

const Card = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg w-80 mx-auto mt-10 text-white">
      <h2 className="text-center text-2xl mb-4">Ready to Sell?</h2>
      <p className="text-center mb-6">Enter Your Property Details Now</p>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-black rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Card;
