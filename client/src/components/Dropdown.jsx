import React, { useState } from "react";
import "./Dropdown.css";
import DashboardCard from "./DashboardCard";
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const Dropdown = ({ property, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { signer, address } = useSigner();
  let contractAddress = "0x22fb69a56F701402aB0304c7041823058b981329";
  const contractABI = Register_Property_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);

  const handleClick = async() =>{
    const EthertoWei = ethers.parseEther("0.01");
    await contract.listProperty(property._ID,EthertoWei);
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "40px",
      }}
    >
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white ">
        <div className="dropdown">
          <button onClick={toggleDropdown} style={{
            color: "rgb(150, 177, 223)",
            background: "transparent",
            border: "none",
            fontSize: "1.3rem",
            width: "100%",
            cursor: "pointer",
          }}>
            Property Title : {property.Name}
          </button>
          {isOpen && (
            <DashboardCard
              key={index}
              PropertyID = {(property._ID).toString()}
              OwnerAddress = {property.owner}
              OwnerName = {property.owner_name}
              OwnerID = {property.owner_Id}
              PropertyName = {property.Name}
              Location = {property.Address}
              Image = {property.ImageUrl}
            />
          )}
        </div>
        <div style={{
            display: "flex",
        }}>
            <button
                className=" py-2 px-4 rounded-full w-full text-sm"
                style={{
                    marginTop: "20px",
                    background: "rgb(65, 181, 111)",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                }}
                onClick={handleClick}
                >
                SELL
            </button>
            </div>
      </div>
    </div>
  );
};

export default Dropdown;
