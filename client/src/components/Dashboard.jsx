import React, { useState } from 'react'
import RegisterProperty_contract from '../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json';
import useSigner from "./useWallet";
import { ethers } from 'ethers';
import MarketPlace from './MarketPlace';
import { useEffect } from 'react';

const Dashboard = () => {
  const { signer, address } = useSigner();
  let contractAddress = "0x8042679c4499FcB314F07f6ac28409f4ff2aFA70";
  let contractABI = RegisterProperty_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);
  const [properties, setproperties] = useState();

  useEffect(()=>{
    const getProperties = async () => {
      const propertyArray = await contract.display(address);
      setproperties(propertyArray);
    }
    getProperties();
  },[signer]);

    return (
      <div className='text-center'>
        {
          properties ? 
          properties.map((property) => <MarketPlace 
          offerTitle={"kuchbhi"}
          imgSrc={property.ImageUrl}
          propertyTitle={property.Name}
          category={"kuchbhi"}
          location={property.Address}
          description={"kuchbhi"}
          equityInfo={"kuchbhi"}
          ownerName={property.owner_name}/>) : 
          <div className='text-center'>Loading...</div>
        }
      </div>
    )
}

export default Dashboard