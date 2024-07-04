import React, { useState, useEffect } from 'react';
import RegisterProperty_contract from '../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json';
import useSigner from "./useWallet";
import { ethers } from 'ethers';
import MarketPlace from './MarketPlace';

const Dashboard = () => {
  const { signer, address } = useSigner();
  let contractAddress = "0x8042679c4499FcB314F07f6ac28409f4ff2aFA70";
  let contractABI = RegisterProperty_contract.abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const propertyArray = await contract.display(address);
      setProperties(propertyArray);
    };
    getProperties();
  }, [signer]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 py-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 -mt-20">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <MarketPlace
              key={index}
              offerTitle="kuchbhi"
              imgSrc={property.ImageUrl}
              propertyTitle={property.Name}
              category="kuchbhi"
              location={property.Address}
              shareType="kuchbhi"
              description="kuchbhi"
              equityInfo="kuchbhi"
              ownerName={property.owner_name}
            />
          ))
        ) : (
          <div className="text-center text-white col-span-full">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
