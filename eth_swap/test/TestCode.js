const { expect } = require("chai");
const { ethers } = require("hardhat");

let gtt;
let ethswap;
let owner;
let addr1;
let addr2;
let addr3;

describe("Deployment", function () {

  it("Should return the supply of token once it's deployed", async function () {
  // deploying token
  const GTT = await hre.ethers.getContractFactory("GTT");
  gtt = await GTT.deploy();
  await gtt.deployed();
  console.log("GTT deployed to:",gtt.address);
  [owner,addr1,addr2,addr3] = await ethers.getSigners();
  expect(await gtt.totalSupply()).to.equal(10000);
  });

  it("Should deploy EthSwap", async function () {
  // deploying swapping contract
  const EthSwap = await hre.ethers.getContractFactory("EthSwap");
  ethswap = await EthSwap.deploy(gtt.address);
  await ethswap.deployed();
  console.log("EthSwap deployed to: ", ethswap.address);
    
    expect(await ethswap.name()).to.equal('Eth Swap X');

  });

  it("Should transfer gtt tokens to ethswap", async function () {
    let a = ethers.BigNumber.from('10000000000000000000000');
    await gtt.transfer(ethswap.address,a);
    expect(ethers.BigNumber.from(await gtt.balanceOf(ethswap.address))).to.equal(a);
  })
});


describe("buytokens", async () => {
  let result;
  it("Should buy tokens from ethswap for a fixed price", async () => {
    result = await ethswap.connect(addr1).buyTokens({from: addr1.address, value: ethers.utils.parseEther('1')});
  })

  // Check investor token balance
  it("Should check if the investor got the tokens:", async () => {
    expect(await gtt.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther('100'));
  })

  // Check ethswap balance
  it("Should return eth swap balance: ", async() => {
    expect(await gtt.balanceOf(ethswap.address)).to.equal(ethers.utils.parseEther('9900'));
    let provider = new ethers.getDefaultProvider('http://127.0.0.1:8545/');
    let balance = await provider.getBalance(ethswap.address);
    expect(ethers.utils.formatEther(balance).toString).to.equal('1.0');
  })
})




