"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const promises_1 = require("timers/promises");
// import { getAddress } from 'ethers'
// import c from '../config/testnet/config'
// import networks from '../config/testnet/config';
const config_1 = require("../config/testnet/config");
const config_2 = require("../config/mainnet/config");
let salt;
if (hardhat_1.network.name.toLowerCase().includes('sepolia') ||
    hardhat_1.network.name === 'ecoTestnet') {
    salt = 'TESTNET';
}
else {
    //   salt = 'PROD'
    salt = 'HANDOFF0';
}
let inboxAddress = '';
let hyperProverAddress = '';
console.log('Deploying to Network: ', hardhat_1.network.name);
console.log(`Deploying with salt: ethers.keccak256(ethers.toUtf8bytes(${salt})`);
salt = hardhat_1.ethers.keccak256(hardhat_1.ethers.toUtf8Bytes(salt));
let deployNetwork;
switch (hardhat_1.network.name) {
    case 'optimismSepoliaBlockscout':
        deployNetwork = config_1.networks.optimismSepolia;
        break;
    case 'baseSepolia':
        deployNetwork = config_1.networks.baseSepolia;
        break;
    case 'ecoTestnet':
        deployNetwork = config_1.networks.ecoTestnet;
        break;
    case 'optimism':
        deployNetwork = config_2.networks.optimism;
        break;
    case 'base':
        deployNetwork = config_2.networks.base;
        break;
    case 'helix':
        deployNetwork = config_2.networks.helix;
        break;
}
async function main() {
    const [deployer] = await hardhat_1.ethers.getSigners();
    const singletonDeployer = await hardhat_1.ethers.getContractAt('Deployer', '0xfc91Ac2e87Cc661B674DAcF0fB443a5bA5bcD0a3');
    let receipt;
    console.log('Deploying contracts with the account:', deployer.address);
    console.log(`**************************************************`);
    if (inboxAddress === '') {
        const inboxFactory = await hardhat_1.ethers.getContractFactory('Inbox');
        const inboxTx = await inboxFactory.getDeployTransaction(deployer.address, true, []);
        receipt = await singletonDeployer.deploy(inboxTx.data, salt, {
            gaslimit: 1000000,
        });
        console.log('inbox deployed');
        inboxAddress = (await singletonDeployer.queryFilter(singletonDeployer.filters.Deployed, receipt.blockNumber))[0].args.addr;
        console.log(`inbox deployed to: ${inboxAddress}`);
        const inbox = await hardhat_1.ethers.getContractAt('Inbox', inboxAddress);
        receipt = await inbox.setMailbox(deployNetwork.hyperlaneMailboxAddress);
        await receipt.wait();
        console.log(`Mailbox set to ${deployNetwork.hyperlaneMailboxAddress}`);
    }
    if (hyperProverAddress === '' && inboxAddress !== '') {
        const hyperProverFactory = await hardhat_1.ethers.getContractFactory('HyperProver');
        const hyperProverTx = await hyperProverFactory.getDeployTransaction(deployNetwork.hyperlaneMailboxAddress, inboxAddress);
        receipt = await singletonDeployer.deploy(hyperProverTx.data, salt, {
            gasLimit: 1000000,
        });
        console.log('hyperProver deployed');
        hyperProverAddress = (await singletonDeployer.queryFilter(singletonDeployer.filters.Deployed, receipt.blockNumber))[0].args.addr;
        console.log(`hyperProver deployed to: ${hyperProverAddress}`);
    }
    console.log('Waiting for 15 seconds for Bytecode to be on chain');
    await (0, promises_1.setTimeout)(15000);
    try {
        await (0, hardhat_1.run)('verify:verify', {
            address: inboxAddress,
            constructorArguments: [deployer.address, true, []],
        });
        console.log('inbox verified at:', inboxAddress);
    }
    catch (e) {
        console.log(`Error verifying inbox`, e);
    }
    try {
        await (0, hardhat_1.run)('verify:verify', {
            address: hyperProverAddress,
            constructorArguments: [
                deployNetwork.hyperlaneMailboxAddress,
                inboxAddress,
            ],
        });
        console.log('hyperProver verified at:', hyperProverAddress);
    }
    catch (e) {
        console.log(`Error verifying hyperProver`, e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
