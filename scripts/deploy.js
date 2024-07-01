const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deploying smart contract from account: ", deployer.address);

    const Register_Property = await ethers.getContractFactory("RegisterProperty");
    const register_property = await Register_Property.deploy();
    console.log("Register property Contract deployed at : ", register_property.target);

    const NFT_Trade = await ethers.getContractFactory("NFT_Trade");
    const nft_trade = await NFT_Trade.deploy();
    console.log("NFT Trade contract deployed at: ", nft_trade.target);
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
});