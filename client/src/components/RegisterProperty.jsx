import React from 'react';

const RegisterProperty = () => {
  return (
    <div className="w-full h-screen bg-custom-gradient flex justify-center items-center">
      <div className="w-96 p-6 bg-opacity-71 bg-gray-900 rounded-lg text-center">
        <h2 className="text-center text-xl font-semibold mb-4 text-white">
          Ready to Sell?
          <br />
          Enter Your Property Details Now
        </h2>
        <input
          className="w-full px-3 py-2 mb-2 border rounded"
          type="text"
          placeholder="Wallet Address"
        />
        <input
          className="w-full px-3 py-2 mb-2 border rounded"
          type="text"
          placeholder="Name"
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded"
          type="text"
          placeholder="Address"
        />
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 mr-2"
          >
            <path d="M12 2L2 13h9l1 9 9-11h-9l-1-9z" />
          </svg>
          <input className="w-full px-3 py-2 border rounded" type="file" />
        </div>
        <button className="w-32 bg-blue-500 text-white py-2 rounded-full mx-auto mt-4">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterProperty;
