// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "contracts/RegisterProperty.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT_Trade is ERC721URIStorage, RegisterProperty{
    uint256 private tokenID = 0;

    constructor() ERC721("Asset","AT"){}

    struct ListedNFT{
        uint256 price;
        address seller;
    }

    mapping (uint256 => ListedNFT) public marketPlace;

    function createNFT(uint256 propertyID_As_URI) public returns (uint256){
        tokenID++;
        uint256 currentID = tokenID;
        _mint(msg.sender, currentID);
        _setTokenURI(currentID, Strings.toString(propertyID_As_URI));
        return currentID;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(price > 0, "NFTs price should be greater than 0");

        approve(address(this), tokenId);
        transferFrom(msg.sender, address(this), tokenId);

        marketPlace[tokenId] = ListedNFT(price, msg.sender);
    }

    function buyNFT (uint256 tokenId) public payable{
        ListedNFT memory listing = marketPlace[tokenId];
        require(listing.price > 0, "Property is not listed");
        require(listing.seller != msg.sender, "You cannot buy your own listed property");
        require(msg.value >= listing.price, "Amount not enough");

        (bool success, ) = payable (listing.seller).call{value: msg.value}("");

        require(success, "Transaction failed!");

        delete marketPlace[tokenId];
        transferFrom(address(this), msg.sender, tokenId);
    }

}