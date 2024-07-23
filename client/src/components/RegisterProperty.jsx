import React, { useCallback, useEffect, useState } from 'react';
import useSigner from "./useWallet";
import axios from "axios";
import RegisterProperty_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";

const RegisterProperty = () => {
  const {signer, address} = useSigner();
  const [walletAddress, setwalletAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerIdNumber, setOwnerIdNumber] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertylocation, setPropertyLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(image){
      try {
        const formData = new FormData();
        formData.append("file", image);

        let contractAddress = "0x22fb69a56F701402aB0304c7041823058b981329";
        const contract = new ethers.Contract(contractAddress, RegisterProperty_contract.abi, signer);
        console.log(contract);

        const resFile = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
              'pinata_api_key': `bfb79ad32b49da703c3b`,
              'pinata_secret_api_key': `e68f3eac05373ca5742ca53020d9ebad0d5f6c9651d84091b28c3b7b6bdf303a`,
              "Content-Type": "multipart/form-data"
          },
        });

      const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(fileHash); 

      await contract.addProperty(address, ownerName, ownerIdNumber, propertyName, propertylocation, fileHash);

      } catch (error) {
        alert(error);
      }
    }
  }

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = ()=> {
      setImage(event.target.files[0]);
    }
    event.preventDefault();
  }

  return (
      <div className="w-full h-screen bg-custom-gradient flex justify-center items-center">
        <div className="w-96 p-6 bg-opacity-71 bg-gray-900 rounded-lg text-center">
          <h2 className="text-center text-xl font-semibold mb-4 text-white">
            Ready to Sell?
            <br />
            Enter Your Property Details Now
          </h2>
          <form onSubmit={handleSubmit} style={{
            color: "white",
          }}>
          <input
            className="w-full px-3 py-2 mb-2 border rounded"
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setwalletAddress(e.target.value)}
            />
            <input
            className="w-full px-3 py-2 mb-2 border rounded"
            type="text"
            placeholder="Enter your fullname"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            />
            <input
            className="w-full px-3 py-2 mb-2 border rounded"
            type="text"
            placeholder="Enter your AADHAR number"
            value={ownerIdNumber}
            onChange={(e) => setOwnerIdNumber(e.target.value)}
            />
          <input
            className="w-full px-3 py-2 mb-2 border rounded"
            type="text"
            placeholder="Name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            />
          <input
            className="w-full px-3 py-2 mb-4 border rounded"
            type="text"
            placeholder="Address"
            value={propertylocation}
            onChange={(e) => setPropertyLocation(e.target.value)}
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
            <input 
            className="w-full px-3 py-2 border rounded" 
            type="file" 
            onChange={retrieveFile}/>
          </div>
          <button 
          className="w-32 bg-blue-500 text-white py-2 rounded-full mx-auto mt-4"
          type='submit'>
            Register
          </button>
          </form>
        </div>
      </div>
  );
};

export default RegisterProperty;
