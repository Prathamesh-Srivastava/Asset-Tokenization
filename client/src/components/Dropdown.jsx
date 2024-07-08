import React, { useState } from "react";
import "./Dropdown.css";
import DashboardCard from "./DashboardCard";
import { FaEdit , FaSave} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";
import axios from 'axios';

const Dropdown = ({ property, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { signer, address } = useSigner();
  let contractAddress = "0xD1698E280345a01D9f26B415562554844d46F565";
  const contractABI = NFT_Trade_contract.abi;
  const contract = new ethers.Contract(contractAddress,contractABI,signer);

  const handleClick = async() =>{
    const metaData = JSON.stringify({
      pinataContent: {
        PropertyID : (property._ID).toString(),
        PrevOwnerAddress: property.owner,
        PrevOwnerName: property.owner_name,
        PrevOwnerID: property.owner_Id,
        PropertyName: property.Name,
        Location: property.Address,
        Image: property.ImageUrl
      },
      pinataMetadata: {
        name: "nft MetaData"
      }
    });

    const resFile = await axios({
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: metaData,
      headers: {
          'pinata_api_key': `bfb79ad32b49da703c3b`,
          'pinata_secret_api_key': `e68f3eac05373ca5742ca53020d9ebad0d5f6c9651d84091b28c3b7b6bdf303a`,
          "Content-Type": "application/json"
      },
    });
    const uri = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    // console.log(uri);
    
    // const tokenId = await contract.createNFT.staticCall(uri);
    // console.log(tokenId);

    // await contract.createNFT(uri);
    const EtherToWei = ethers.parseEther("0.0001");
    // await contract.listNFT(tokenId,EtherToWei, {
    //   gasLimit: 1000000
    // });
    await contract.createNFTandList(contractAddress,uri,address,EtherToWei);
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
            {/* <div className=" py-2 px-4 rounded-full w-full text-sm" style={{
                    marginTop: "20px",
                    marginRight: "10px",
                    background: "rgb(65, 87, 154)",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
            }}>
               
                ₹5000000
            </div> */}
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
