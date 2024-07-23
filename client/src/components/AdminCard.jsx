import React from "react";
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import NFT_Trade_contract from "../../../artifacts/contracts/NFT_Trade.sol/NFT_Trade.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";
import axios from "axios";

const AdminCard = ({
  PropertyID,
  OwnerAddress,
  OwnerName,
  OwnerID,
  PropertyName,
  Location,
  Image,
  Price,
  Seller,
  Buyer,
}) => {
  const { signer, address } = useSigner();
  const [show, setShow] = React.useState(false);

  const reg_address = "0x22fb69a56F701402aB0304c7041823058b981329";
  const regABI = Register_Property_contract.abi;
  const reg_contract = new ethers.Contract(reg_address, regABI, signer);

  const nft_contract_address = "0xc1ae689D035A0FD3e74CDcD032ABA10ebdC57a36";
  const nftABI = NFT_Trade_contract.abi;
  const nft_contract = new ethers.Contract(
    nft_contract_address,
    nftABI,
    signer
  );

  const handleClick = async () => {
    console.log(PropertyID);
    const metaData = JSON.stringify({
      pinataContent: {
        PropertyID: PropertyID.toString(),
        PrevOwnerAddress: OwnerAddress,
        PrevOwnerName: OwnerName,
        PrevOwnerID: OwnerName,
        PropertyName: PropertyName,
        Location: Location,
        Image: Image,
      },
      pinataMetadata: {
        name: "nft MetaData",
      },
    });

    const resFile = await axios({
      method: "POST",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: metaData,
      headers: {
        pinata_api_key: `bfb79ad32b49da703c3b`,
        pinata_secret_api_key: `e68f3eac05373ca5742ca53020d9ebad0d5f6c9651d84091b28c3b7b6bdf303a`,
        "Content-Type": "application/json",
      },
    });
    const uri = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    console.log(uri);

    await nft_contract.createNFT(Buyer, uri);
    await reg_contract.sold(PropertyID);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="bg-gray-900 p-4 rounded-lg shadow-lg text-white w-[22rem]"
        onClick={() => setShow(!show)}
        style={{
          cursor: "pointer",
        }}
      >
        <div
          className="bg-[#494370] text-white text-sm px-2 py-1 rounded-full w-max mb-2"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          PropertyId : {PropertyID}
        </div>
        <img
          src={Image}
          alt="Property"
          className="w-32 h-40 object-cover rounded-md"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />
        {show && (
          <div className="flex space-x-2 mb-3">
            <div className="bg-[#1B2532] bg-opacity-91 p-2 rounded-lg w-full">
              <h3 className="text-lg font-semibold">{PropertyName}</h3>
              <p className="text-xs">
                Owner_Name:
                <br /> {OwnerName}
              </p>
              <p className="text-xs">
                Owner_ID:
                <br /> {OwnerID}
              </p>
              <p className="text-xs">
                Owner_walletAddress:
                <br /> {OwnerAddress}
              </p>
              <p className="text-xs">
                Price
                <br /> {ethers.formatEther(Price).toString()}
              </p>
              <p className="text-xs">
                Seller:
                <br /> {Seller}
              </p>
              <p className="text-xs">
                Buyer:
                <br /> {Buyer}
              </p>
            </div>
          </div>
        )}
        <p className="text-xs mb-3">{Location}</p>
        <button
          className="bg-gray-200 text-black py-2 px-4 rounded-full w-full text-sm"
          onClick={handleClick}
        >
          {" "}
          Transfer NFT{" "}
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
