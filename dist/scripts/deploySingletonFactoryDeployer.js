"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const singletonFactoryAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f';
console.log('Deploying to Network: ', hardhat_1.network.name);
async function deploySingletonFactoryDeployer() {
    const deployerSalt = hardhat_1.ethers.keccak256(hardhat_1.ethers.toUtf8Bytes('ECO'));
    const singletonFactory = await hardhat_1.ethers.getContractAt('SingletonFactory', singletonFactoryAddress);
    const deployerTx = await (await hardhat_1.ethers.getContractFactory('Deployer')).getDeployTransaction(hardhat_1.ethers.ZeroAddress);
    const receipt = await singletonFactory.deploy(deployerTx.data, deployerSalt);
    await receipt.wait();
    console.log('singleton deployer deployed! Transaction hash: ', receipt.hash);
}
deploySingletonFactoryDeployer();
