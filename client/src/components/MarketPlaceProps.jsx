import React, { useEffect, useState } from "react";
import MarketPlaceCard from "./MarketPlaceCard";
import Register_Property_contract from "../../../artifacts/contracts/RegisterProperty.sol/RegisterProperty.json";
import { ethers } from "ethers";
import useSigner from "./useWallet";

const MarketPlaceProps = () => {
  const { signer, address } = useSigner();
  let contractAddress = "0x22fb69a56F701402aB0304c7041823058b981329";
  const contractABI = Register_Property_contract.abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const [listedProperties, setListedProperties] = useState([]);

  useEffect(() => {
    const getListedProperties = async () => {
      const listedPropertyArray = await contract.showListed();
      setListedProperties(listedPropertyArray);
    };

    getListedProperties();
  }, [signer]);

  return (
    <div className="min-h-screen py-10">
      {listedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listedProperties.map((prop) => (
            <MarketPlaceCard
              PropertyID={prop._ID}
              OwnerAddress={prop.owner}
              OwnerName={prop.owner_name}
              OwnerID={prop.owner_Id}
              PropertyName={prop.Name}
              Location={prop.Address}
              Image={prop.ImageUrl}
              Price={prop.Price}
              Seller={prop.owner}
            />
          ))}
        </div>
      ) : (
        <center
          style={{
            margin: "100px 0",
            alignContent: "center",
            alignItems: "center",
            color: "rgb(104,151,179)",
            fontSize: "3rem",
          }}
        >
          No Properties Listed
        </center>
      )}
    </div>
  );
};

export default MarketPlaceProps;
