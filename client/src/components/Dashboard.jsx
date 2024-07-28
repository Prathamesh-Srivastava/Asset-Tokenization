import React, { useState, useEffect } from "react";
import RegisterProperty_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import useSigner from "./useWallet";
import { ethers } from "ethers";
import WelcomeMessage from "./WelcomeMessage";
import Dropdown from "./Dropdown";

const Dashboard = ({ walletConnected }) => {
  const { signer, address } = useSigner();
  let contractAddress = "0x22fb69a56F701402aB0304c7041823058b981329";
  let contractABI = RegisterProperty_contract.abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const propertyArray = await contract.display(address);
      setProperties(propertyArray);
    };
    getProperties();
  }, [signer,properties]);

  return (
    <div className="min-h-screen py-10">
      {properties.length > 0 ? (
        properties.map((property, index) => (
          <div>
            <Dropdown key={index} property={property} indes={index} />
          </div>
        ))
      ) : (
        <WelcomeMessage walletConnected={walletConnected} />
      )}
    </div>
  );
};

export default Dashboard;
