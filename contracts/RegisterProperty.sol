// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract RegisterProperty{
    uint256 private propertyID = 0;

    struct Property{
        uint256 _ID;
        address owner;
        string owner_name;
        string owner_Id;
        string Name;
        string Address;
        string ImageUrl;
    }
    

    Property[] public properties;
    mapping (uint256 => uint256) IdtoIndex;

    function addProperty(address propertyOwner, string memory owner_name, string memory owner_Id, string memory propertyName, string memory propertyAddress,
    string memory propertyImage) public{
        propertyID++;
        uint256 currId = propertyID;

        Property memory newProperty = Property(currId,propertyOwner,owner_name,owner_Id,propertyName,propertyAddress,propertyImage);
        
        properties.push(newProperty);
        IdtoIndex[currId] = properties.length-1;
    }


    function display(address property_owner) public view returns (Property[] memory){
        uint cnt=0;
        for(uint i=0;i<properties.length;i++){
            if(properties[i].owner == property_owner){
                cnt++;
            }
        }

        Property [] memory ownerProperties = new Property[](cnt);
        uint j = 0;
        for(uint i=0;i<properties.length;i++){
            if(properties[i].owner == property_owner){
                ownerProperties[j] = properties[i];
                j++;
            }
        }

        return ownerProperties;
    }

    function changeOwner(uint256 propId, address newOwner) public{
        uint256 indx = IdtoIndex[propId];
        properties[indx].owner = newOwner;
    }

}