// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT_Trade is ERC721URIStorage{
    uint256 private token_ID = 0;

    constructor() ERC721("Asset","AT"){}

    struct ListedNFT{
        uint256 _Id;
        uint256 price;
        address seller;
    }

    ListedNFT [] public  listedproperties;
    mapping (uint256 => uint256) public Id_to_Idx;
    mapping (uint256 => bool) public isListed;

    function createNFT(string memory uri) public returns (uint256){
        token_ID++;
        uint256 currentID = token_ID;
        _mint(msg.sender, currentID);
        _setTokenURI(currentID, uri);
        return currentID;
    }

    function createNFTandList(address to, string memory uri, address seller, uint256 price) public returns (uint256){
        token_ID++;
        uint256 currentID = token_ID;
        _mint(to,currentID);
        _setTokenURI(currentID, uri);

        require(price > 0, "NFTs price should be greater than 0");
        ListedNFT memory nft = ListedNFT(currentID, price, seller);
        listedproperties.push(nft);
        Id_to_Idx[currentID] = listedproperties.length-1;
        isListed[currentID] = true;
        return currentID;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(price > 0, "NFTs price should be greater than 0");
        transferFrom(msg.sender, address(this), tokenId);

        ListedNFT memory nft = ListedNFT(tokenId, price, msg.sender);
        listedproperties.push(nft);
        Id_to_Idx[tokenId] = listedproperties.length-1;
        isListed[tokenId] = true;
    }

    function buyNFT (uint256 tokenId) public payable{
        uint256 index = Id_to_Idx[tokenId];
        ListedNFT memory listing = listedproperties[index];

        require(listing.price > 0, "Property is not listed");
        require(listing.seller != msg.sender, "You cannot buy your own listed property");
        require(msg.value >= listing.price, "Amount not enough");

        (bool success, ) = payable (listing.seller).call{value: msg.value}("");

        require(success, "Transaction failed!");

        transferFrom(address(this), msg.sender, tokenId);
        isListed[tokenId] = false;
    }

    function checkListing (uint256 tokenId) public view returns (bool){
        if(isListed[tokenId] == true)
        return true;
        
        else
        return false;
    }

    function unList (uint256 tokenId) public {
        isListed[tokenId] = false;
        transferFrom(address(this), msg.sender, tokenId);
    }

    function displayNFTS () public view returns (ListedNFT [] memory){
        uint256 cnt = 0;
        for(uint256 i=0;i<listedproperties.length;i++){
            if(isListed[listedproperties[i]._Id] == true){
                cnt++;
            }
        }

        ListedNFT [] memory resArray = new ListedNFT[](cnt);
        uint256 j = 0;
        for(uint256 i=0;i<listedproperties.length;i++){
            if(isListed[listedproperties[i]._Id] == true){
                resArray[j] = listedproperties[i];
                j++;
            }
        }

        return resArray;
    }

}