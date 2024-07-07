import React, { useState } from "react";
import "./Dropdown.css";
import DashboardCard from "./DashboardCard";
import { FaEdit , FaSave} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Dropdown = ({ property, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
            // fontWeight: "bold",/
            width: "100%",
            cursor: "pointer",
          }}>
            Property Title : Vatsal Property
          </button>
          {isOpen && (
            <DashboardCard
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
          )}
        </div>
        <div style={{
            display: "flex",
        }}>
            <div className=" py-2 px-4 rounded-full w-full text-sm" style={{
                    marginTop: "20px",
                    marginRight: "10px",
                    background: "rgb(65, 87, 154)",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
            }}>
               
                ₹5000000
            </div>
            <button
                className=" py-2 px-4 rounded-full w-full text-sm"
                //   onClick={handleClick}
                style={{
                    marginTop: "20px",
                    background: "rgb(65, 181, 111)",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                }}
                >
                SELL
            </button>
            </div>
      </div>
    </div>
  );
};

export default Dropdown;
