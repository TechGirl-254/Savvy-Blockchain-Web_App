const hre = require("hardhat");

async function main() {
  const Transactions = hre.ethers.getContractFactory("Transactions");

  const transactions = await hre.ethers.deployContract("Transactions");

  await transactions.waitForDeployment();

  console.log(`Transactions deployed to:${transactions.target}`);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();