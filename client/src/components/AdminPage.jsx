import React, { useEffect, useState} from 'react';
import AdminCard from "./AdminCard";
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";
import WelcomeMessage from './WelcomeMessage';

const AdminPage = () => {
  const {signer, address} = useSigner();
  let contractAddress = "0x22fb69a56F701402aB0304c7041823058b981329";
  const contractABI = Register_Property_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);

  const [intrestedProperties,setIntrestedProperties] = useState([]);

  useEffect(()=>{
    const getIntrestedProperties = async () => {
      const intrestedPropertyArray = await contract.showIntrested();
      setIntrestedProperties(intrestedPropertyArray);
    };

    getIntrestedProperties();
  },[signer]);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {
      (intrestedProperties.length > 0) ? intrestedProperties.map((prop)=>
        <AdminCard
      PropertyID = {prop._ID}
      OwnerAddress = {prop.owner}
      OwnerName = {prop.owner_name}
      OwnerID = {prop.owner_Id}
      PropertyName = {prop.Name}
      Location = {prop.Address}
      Image = {prop.ImageUrl}
      Price = {prop.Price}
      Seller = {prop.owner}
      Buyer = {prop.Buyer}
      />): <WelcomeMessage  />
    }
  </div>
    </div>
  
  );
};

export default AdminPage;
