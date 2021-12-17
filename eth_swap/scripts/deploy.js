
const hre = require("hardhat");

async function main() {

  // deploying token
  const GTT = await hre.ethers.getContractFactory("GTT");
  const gtt = await GTT.deploy();
  await gtt.deployed();
  console.log("GTT deployed to:",gtt.address);

  // deploying swapping contract
  const EthSwap = await hre.ethers.getContractFactory("EthSwap");
  const ethswap = await EthSwap.deploy(gtt.address);
  await ethswap.deployed();
  console.log("EthSwap deployed to: ", ethswap.address);



  // transferring to ethswap
await gtt.transfer(ethswap.address,10000);
console.log('Transferred to ethswap');

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
