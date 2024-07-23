import React from "react";

const DashboardCard = ({
  PropertyID,
  OwnerAddress,
  OwnerName,
  OwnerID,
  PropertyName,
  Location,
  Image
}) => {
  return (
    <>
      <div
        className="flex space-x-2 mb-3"
        style={{
          marginTop: "20px",
        }}
      >
        <img
          src={Image}
          alt="Property"
          className="w-32 h-40 object-cover rounded-md"
          style={{
            width: "50%",
            height: "350px",
            objectFit: "inherit",
          }}
        />
        <div className="bg-[#1B2532] bg-opacity-91 p-2 rounded-lg" style={{
          color: "rgb(112, 139, 156)",
          flex: "1",
        }}>
          <p className="text-lg font-semibold">
            PropertyID : {PropertyID}
          </p>
          <p className="text-lg font-semibold">
            OwnerAddress : {OwnerAddress}
          </p>
          <p className="text-lg font-semibold">
          OwnerName: {OwnerName}
          </p>
          <p className="text-lg font-semibold">
          OwnerID: {OwnerID}
          </p>
          <p className="text-lg font-semibold">
          PropertyName: {PropertyName}
          </p>
          <p className="text-lg font-semibold">
          Location: {Location}
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
