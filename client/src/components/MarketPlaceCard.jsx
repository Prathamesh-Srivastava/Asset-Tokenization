import React from 'react';
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceCard = ({
  TokenID, 
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

  let nft_trade_address = "0xD1698E280345a01D9f26B415562554844d46F565";
  const nftABI = NFT_Trade_contract.abi;
  const nft_trade = new ethers.Contract(nft_trade_address,nftABI,signer);

  let register_prop_address = "0x8042679c4499FcB314F07f6ac28409f4ff2aFA70";
  const registerABI = Register_Property_contract.abi;
  const register_prop = new ethers.Contract(register_prop_address,registerABI,signer);


  const handleClick = async() =>{
    try {
      if(address.toString() === Seller){
        await nft_trade.unList(TokenID, {
          gasLimit: 100000
        });
      }else{
        await nft_trade.buyNFT(TokenID,{
          gasLimit: 100000
        });
        const propId = BigInt(PropertyID);
        await register_prop.changeOwner(propId,address);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white w-[22rem]">
        <div className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2">
          {PropertyID}
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
          </div>
        </div>
        <p className="text-xs mb-3">{Location}</p>
        <button className="bg-gray-200 text-black py-2 px-4 rounded-full w-full text-sm"
        onClick={handleClick}>
          {address.toString() === Seller ? "Unlist" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
