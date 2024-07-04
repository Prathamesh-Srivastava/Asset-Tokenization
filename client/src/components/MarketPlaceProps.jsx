import React, { useEffect, useState } from 'react';
import MarketPlaceCard from './MarketPlaceCard';
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceProps = () => {
  const {signer, address} = useSigner();
  let contractAddress = "0x27490D3a6AEDC829510CFa699B9B48749E4f3bfF";
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
  },[]);

  const pullJson = async (prop) =>{
    const fetchedUri = await contract.tokenURI(prop._Id);
    // console.log(fetchedUri);

    fetch(fetchedUri)
    .then(respone => respone.json())
    .then(responseData => {
      setFetchedData(prevData => [...prevData, responseData]);
    })
  }

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
    <>
    {
      (ListedNFTS && fetchedData) ? fetchedData.map((nft)=>
      <MarketPlaceCard
      offerTitle={"kuchbhi"}
      imgSrc={nft.Image}
      propertyTitle={nft._Id}
      category={"kuchbhi"}
      location={nft.Address}
      shareType={"kuchbhi"}
      description={nft.Description}
      equityInfo={"kuchbhi"}
      ownerName={"kuchbhi"}
    />): <div>Loading....</div>
    }
    </>
  );
};

export default MarketPlaceProps;
