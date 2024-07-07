import React from "react";
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const DashboardCard = ({
  offerTitle,
  imgSrc,
  propertyTitle,
  category,
  location,
  shareType,
  description,
  equityInfo,
  ownerName,
}) => {
  const { signer, address } = useSigner();
  let contractAddress = "0x27490D3a6AEDC829510CFa699B9B48749E4f3bfF";
  const contractABI = NFT_Trade_contract.abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const handleClick = async () => {};

  return (
    <>
      {/* <div className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2">
        {offerTitle}
      </div> */}
      <div
        className="flex space-x-2 mb-3"
        style={{
          marginTop: "20px",
        }}
      >
        <img
          src={imgSrc}
          alt="Property"
          className="w-32 h-40 object-cover rounded-md"
          style={{
            width: "50%",
            height: "350px",
            objectFit: "inherit",
          }}
        />
        <div className="bg-[#1B2532] bg-opacity-91 p-2 rounded-lg w-full" style={{
          color: "rgb(112, 139, 156)",
          flex: "1",
        }}>
          <p className="text-lg font-semibold">
            Owner Name : {propertyTitle}
          </p>
          <p className="text-lg font-semibold">
            Category : {category}
          </p>
          <p className="text-lg font-semibold">
            Location: {location}
          </p>
          <p className="text-lg font-semibold">
            Share Type: {shareType}
          </p>
          <p className="text-lg font-semibold">{description}</p>
          {/* <div className="flex justify-between items-center mb-3"> */}
            <p className="text-lg font-semibold">{equityInfo}</p>
            <p className="text-lg font-semibold">{ownerName}</p>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
