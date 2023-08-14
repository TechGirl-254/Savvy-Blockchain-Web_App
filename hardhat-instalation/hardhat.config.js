require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/9kIbLNFmNqRkkyeaR3DuXvwrwWVH33Sa',
      accounts: ['de491357e90273ed9eca6ac04bf8276f98e173d204d178bc03fa4f5f43b54432']
    }
  }
};
