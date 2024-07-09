import React, { useEffect, useState} from 'react';
import MarketPlaceCard from './MarketPlaceCard';
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceProps = () => {
  const {signer, address} = useSigner();
  let contractAddress = "0x5B1355045710dFF6299e66B43d95f65c0cF7b9ea";
  const contractABI = NFT_Trade_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);

  const [ListedNFTS, setListedNFTS] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  
  useEffect(()=>{
    const getNFTS = async () =>{
      const resArr = await contract.displayNFTS();
      setListedNFTS(resArr);
    }
    getNFTS();
  },[signer]);

  const pullJson = async (prop) =>{
    const fetchedUri = await contract.tokenURI(prop._Id);
    // console.log(fetchedUri);

    fetch(fetchedUri)
    .then(respone => respone.json())
    .then(responseData => {
      setFetchedData(prevData => {
        if (!prevData.some(data => data.PropertyID === responseData.PropertyID)) {
          responseData.price = prop.price;
          responseData.seller = prop.seller;
          responseData.tokenId = prop._Id;
          return [...prevData, responseData];
        }
        return prevData;
      });
    });
};

  const storeJSON = async()=>{
    setFetchedData([]);
    for(let i = 0;i<ListedNFTS.length;i++){
      await pullJson(ListedNFTS[i]);
    }
  }

  useEffect(() => {
    setFetchedData([]);
    if (ListedNFTS !== null) {
      storeJSON();
    }
  }, [ListedNFTS]);

  return (
    <div className="min-h-screen py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {
      (ListedNFTS && fetchedData) ? fetchedData.map((nft)=>
        <MarketPlaceCard
      TokenID = {nft.tokenId}
      PropertyID = {nft.PropertyID}
      OwnerAddress = {nft.PrevOwnerAddress}
      OwnerName = {nft.PrevOwnerName}
      OwnerID = {nft.PrevOwnerID}
      PropertyName = {nft.PropertyName}
      Location = {nft.Location}
      Image = {nft.Image}
      Price = {nft.price}
      Seller = {nft.seller}
      />): <div>Loading....</div>
    }
  </div>
    </div>
  
  );
};

export default MarketPlaceProps;
