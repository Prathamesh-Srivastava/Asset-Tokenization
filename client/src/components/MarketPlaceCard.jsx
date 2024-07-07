import React from 'react';
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceCard = ({ offerTitle, imgSrc, propertyTitle, category, location, shareType, description, equityInfo, ownerName }) => {
  
  const { signer, address } = useSigner();
  let contractAddress = "0x27490D3a6AEDC829510CFa699B9B48749E4f3bfF";
  const contractABI = NFT_Trade_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);


  const handleClick = async() =>{
    
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white w-[22rem]">
        <div className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2">
          {offerTitle}
        </div>
        <div className="flex space-x-2 mb-3">
          <img src={imgSrc} alt="Property" className="w-32 h-40 object-cover rounded-md" />
          <div className='bg-[#1B2532] bg-opacity-91 p-2 rounded-lg w-full'>
            <h3 className="text-lg font-semibold">{propertyTitle}</h3>
            <p className="text-xs">Category:<br/> {category}</p>
            <p className="text-xs">Location:<br/> {location}</p>
            <p className="text-xs">Share Type:<br/> {shareType}</p>
          </div>
        </div>
        <p className="text-xs mb-3">{description}</p>
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-xs">{equityInfo}</p>
          <p className="text-xs">{ownerName}</p>
        </div>
        <button className="bg-gray-200 text-black py-2 px-4 rounded-full w-full text-sm"
        onClick={handleClick}>
          BUY
        </button>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
