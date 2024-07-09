// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT_Trade is ERC721URIStorage {
    uint256 private token_ID = 0;

    constructor() ERC721("Asset", "AT") {}

    struct ListedNFT {
        uint256 _Id;
        uint256 price;
        address seller;
    }

    ListedNFT[] public listedproperties;
    mapping(uint256 => uint256) public Id_to_Idx;
    mapping(uint256 => bool) public isListed;

    event NFTCreated(uint256 indexed tokenId, string uri);
    event NFTListed(uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTUnlisted(uint256 indexed tokenId, address indexed owner);
    event NFTBought(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event Debug(string message, uint256 tokenId, address user);

    function createNFT(string memory uri) public returns (uint256) {
        token_ID++;
        uint256 currentID = token_ID;
        _mint(msg.sender, currentID);
        _setTokenURI(currentID, uri);

        emit NFTCreated(currentID, uri);
        return currentID;
    }

    function createNFTandList(address to, string memory uri, address seller, uint256 price) public returns (uint256) {
        token_ID++;
        uint256 currentID = token_ID;
        _mint(to, currentID);
        _setTokenURI(currentID, uri);

        require(price > 0, "NFTs price should be greater than 0");
        ListedNFT memory nft = ListedNFT(currentID, price, seller);
        listedproperties.push(nft);
        Id_to_Idx[currentID] = listedproperties.length - 1;
        isListed[currentID] = true;

        emit NFTListed(currentID, price, seller);
        return currentID;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(price > 0, "NFTs price should be greater than 0");
        approve(address(this), tokenId);
        transferFrom(msg.sender, address(this), tokenId);

        ListedNFT memory nft = ListedNFT(tokenId, price, msg.sender);
        listedproperties.push(nft);
        Id_to_Idx[tokenId] = listedproperties.length - 1;
        isListed[tokenId] = true;

        emit NFTListed(tokenId, price, msg.sender);
    }

    function buyNFT(uint256 tokenId) public payable {
        uint256 index = Id_to_Idx[tokenId];
        ListedNFT memory listing = listedproperties[index];

        require(isListed[tokenId] == true, "Property is not listed");
        require(listing.seller != msg.sender, "You cannot buy your own listed property");
        require(msg.value >= listing.price, "Amount not enough");

        // Ensure the contract is approved to transfer the NFT
        require(getApproved(tokenId) == address(this) || isApprovedForAll(listing.seller, address(this)), "Contract is not approved to transfer this NFT");

        emit Debug("Before Payment", tokenId, msg.sender);

        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Transaction failed!");

        emit Debug("After Payment", tokenId, msg.sender);

        transferFrom(address(this), msg.sender, tokenId);
        isListed[tokenId] = false;

        emit NFTBought(tokenId, msg.sender, listing.price);
    }

    function checkListing(uint256 tokenId) public view returns (bool) {
        return isListed[tokenId];
    }

    function unList(uint256 tokenId) public {
        require(isListed[tokenId], "NFT is not listed");
        require(ownerOf(tokenId) == address(this), "Contract does not own this NFT");
        require(listedproperties[Id_to_Idx[tokenId]].seller == msg.sender, "Caller is not the seller");

        emit Debug("Before Unlisting", tokenId, msg.sender);

        isListed[tokenId] = false;
        transferFrom(address(this), msg.sender, tokenId);

        emit Debug("After Unlisting", tokenId, msg.sender);

        emit NFTUnlisted(tokenId, msg.sender);
    }

    function displayNFTS() public view returns (ListedNFT[] memory) {
        uint256 cnt = 0;
        for (uint256 i = 0; i < listedproperties.length; i++) {
            if (isListed[listedproperties[i]._Id] == true) {
                cnt++;
            }
        }

        ListedNFT[] memory resArray = new ListedNFT[](cnt);
        uint256 j = 0;
        for (uint256 i = 0; i < listedproperties.length; i++) {
            if (isListed[listedproperties[i]._Id] == true) {
                resArray[j] = listedproperties[i];
                j++;
            }
        }

        return resArray;
    }

    receive() external payable {}
}
