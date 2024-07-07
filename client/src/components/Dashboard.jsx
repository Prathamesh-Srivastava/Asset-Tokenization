import React, { useState, useEffect } from 'react';
import RegisterProperty_contract from '../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json';
import useSigner from "./useWallet";
import { ethers } from 'ethers';
import WelcomeMessage from './WelcomeMessage';
import Dropdown from './Dropdown';

const Dashboard = ({walletConnected}) => {
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
    <div className="min-h-screen py-10">
        {properties.length > 0 ? (
          properties.map((property, index) => (
      <div>
            <Dropdown
              key={index}
              property={property}
              indes={index}
            />
      </div>
          ))
        ) : (
          <WelcomeMessage walletConnected={walletConnected}/>
        )}
    </div>
  );
};

export default Dashboard;
