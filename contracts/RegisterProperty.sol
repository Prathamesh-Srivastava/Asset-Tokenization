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
        uint256 Price;
        address Buyer;
    }
    
    Property[] public properties;
    mapping (uint256 => bool) isListed;
    mapping (uint256 => bool) isIntrested;
    mapping (uint256 => bool) isSold;
    mapping (uint256 => uint256) IdtoIndex;

    function addProperty(address propertyOwner, string memory owner_name, string memory owner_Id, string memory propertyName, string memory propertyAddress,
    string memory propertyImage) public{
        propertyID++;
        uint256 currId = propertyID;

        Property memory newProperty = Property(currId,propertyOwner,owner_name,owner_Id,propertyName,propertyAddress,propertyImage,0,address(0));
        
        properties.push(newProperty);
        isListed[currId] = false;
        isIntrested[currId] = false;
        isSold[currId] = false;
        IdtoIndex[currId] = properties.length-1;
    }

    function listProperty(uint256 propertyId, uint256 price) public {
        isListed[propertyId] = true;
        uint256 indx = IdtoIndex[propertyId];
        properties[indx].Price = price;
    }

    function unlist(uint256 propertyId) public{
        isListed[propertyId] = false;
        uint256 indx = IdtoIndex[propertyId];
        properties[indx].Price = 0;
    }

    function showIntrest(uint256 propertyId) public {
        isIntrested[propertyId] = true;
        uint256 indx = IdtoIndex[propertyId];
        properties[indx].Buyer = msg.sender;
    }

    function sold(uint256 propertyId) public{
        isSold[propertyId] = true;
        isListed[propertyId] = false;
        isIntrested[propertyId] = false;
    }

    function display(address property_owner) public view returns (Property[] memory){
        uint cnt=0;
        for(uint i=0;i<properties.length;i++){
            if((properties[i].owner == property_owner) && (isListed[properties[i]._ID] == false)
            && (isIntrested[properties[i]._ID] == false) && (isSold[properties[i]._ID] == false)){
                cnt++;
            }
        }

        Property [] memory ownerProperties = new Property[](cnt);
        uint j = 0;
        for(uint i=0;i<properties.length;i++){
            if((properties[i].owner == property_owner) && (isListed[properties[i]._ID] == false)
            && (isIntrested[properties[i]._ID] == false) && (isSold[properties[i]._ID] == false)){
                ownerProperties[j] = properties[i];
                j++;
            }
        }

        return ownerProperties;
    }


    function showListed() public view returns (Property[] memory){
        uint cnt=0;
        for(uint i=0;i<properties.length;i++){
            if((isListed[properties[i]._ID] == true) && (isIntrested[properties[i]._ID] == false)){
                cnt++;
            }
        }

        Property [] memory listedProperties = new Property[](cnt);
        uint j = 0;
        for(uint i=0;i<properties.length;i++){
            if((isListed[properties[i]._ID] == true) && (isIntrested[properties[i]._ID] == false)){
                listedProperties[j] = properties[i];
                j++;
            }
        }

        return listedProperties;
    }

    function showIntrested() public view returns (Property[] memory){
        uint cnt=0;
        for(uint i=0;i<properties.length;i++){
            if((isIntrested[properties[i]._ID] == true)){
                cnt++;
            }
        }

        Property [] memory intrestedProperties = new Property[](cnt);
        uint j = 0;
        for(uint i=0;i<properties.length;i++){
            if(isIntrested[properties[i]._ID] == true){
                intrestedProperties[j] = properties[i];
                j++;
            }
        }

        return intrestedProperties;
    }

    function changeOwner(uint256 propId, address newOwner) public{
        uint256 indx = IdtoIndex[propId];
        properties[indx].owner = newOwner;
    }

}