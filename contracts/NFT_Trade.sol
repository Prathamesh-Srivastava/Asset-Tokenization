// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT_Trade is ERC721URIStorage {
    uint256 private token_ID = 0;

    constructor() ERC721("Asset", "AT") {}

    function createNFT(address to, string memory uri) public returns (uint256) {
        token_ID++;
        uint256 currentID = token_ID;
        _mint(to, currentID);
        _setTokenURI(currentID, uri);
        return currentID;
    }

    receive() external payable {}
}
