import React from 'react';
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceCard = ({
  PropertyID,
  OwnerAddress,
  OwnerName,
  OwnerID,
  PropertyName,
  Location,
  Image,
  Price,
  Seller
 }) => {
  
  const { signer, address } = useSigner();

  const contract_address = "0x22fb69a56F701402aB0304c7041823058b981329";
  const contractABI = Register_Property_contract.abi;
  const contract = new ethers.Contract(contract_address,contractABI,signer);

  const handleUnlist = async() =>{
    console.log(PropertyID);
    await contract.unlist(PropertyID);
  }

  const handleShowIntrest = async() =>{
    console.log(PropertyID);
    await contract.showIntrest(PropertyID);
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white w-[22rem]">
        <div className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2">
          {PropertyID.toString()}
        </div>
        <div className="flex space-x-2 mb-3">
          <img src={Image} alt="Property" className="w-32 h-40 object-cover rounded-md" />
          <div className='bg-[#1B2532] bg-opacity-91 p-2 rounded-lg w-full'>
            <h3 className="text-lg font-semibold">{PropertyName}</h3>
            <p className="text-xs">Owner_Name:<br/> {OwnerName}</p>
            <p className="text-xs">Owner_ID:<br/> {OwnerID}</p>
            <p className="text-xs">Owner_walletAddress:<br/> {OwnerAddress}</p>
            <p className="text-xs">Price<br/> {ethers.formatEther(Price).toString()}</p>
            <p className="text-xs">Seller:<br/> {Seller}</p>
            <p className="text-xs mb-3">Location:<br/>{Location}</p>
          </div>
        </div>
          {address.toString() === Seller ? <button className="bg-gray-200 text-black py-2 px-4 rounded-full w-full text-sm"
        onClick={handleUnlist}> Unlist </button>: <button className="bg-gray-200 text-black py-2 px-4 rounded-full w-full text-sm"
        onClick={handleShowIntrest}> Show Intrest </button>}
      </div>
    </div>
  );
};

export default MarketPlaceCard;
