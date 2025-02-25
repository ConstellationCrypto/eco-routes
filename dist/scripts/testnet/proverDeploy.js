"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const promises_1 = require("timers/promises");
// import { getAddress } from 'ethers'
// import c from '../config/testnet/config'
// import networks from '../config/testnet/config';
const config_1 = require("../../config/testnet/config");
const networkName = hardhat_1.network.name;
console.log('Deploying to Network: ', hardhat_1.network.name);
const baseSepoliaChainConfiguration = {
    chainId: config_1.networks.baseSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.baseSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.baseSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.baseSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.baseSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.baseSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
    },
};
const optimismSepoliaChainConfiguration = {
    chainId: config_1.networks.optimismSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.optimismSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.optimismSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.optimismSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.optimismSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.optimismSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
    },
};
const ecoTestnetChainConfiguration = {
    chainId: config_1.networks.ecoTestnet.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.ecoTestnet.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.ecoTestnet.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.ecoTestnet.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.ecoTestnet.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.ecoTestnet.proving.outputRootVersionNumber, // outputRootVersionNumber
    },
};
let counter = 0;
switch (networkName) {
    case 'baseSepolia':
        counter = config_1.networks.baseSepolia.intentSource.counter;
        break;
    case 'optimismSepolia':
        counter = config_1.networks.optimismSepolia.intentSource.counter;
        break;
    case 'ecoTestnet':
        counter = config_1.networks.ecoTestnet.intentSource.counter;
        break;
    default:
        counter = 0;
        break;
}
console.log('Counter: ', counter);
console.log('Deploying to Network: ', hardhat_1.network.name);
async function main() {
    const [deployer] = await hardhat_1.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    const proverFactory = await hardhat_1.ethers.getContractFactory('Prover');
    const prover = await proverFactory.deploy([
        baseSepoliaChainConfiguration,
        optimismSepoliaChainConfiguration,
        ecoTestnetChainConfiguration,
    ]);
    console.log('prover implementation deployed to: ', await prover.getAddress());
    // adding a try catch as if the contract has previously been deployed will get a
    // verification error when deploying the same bytecode to a new address
    try {
        if (hardhat_1.network.name !== 'hardhat') {
            console.log('Waiting for 30 seconds for Bytecode to be on chain');
            await (0, promises_1.setTimeout)(30000);
            await (0, hardhat_1.run)('verify:verify', {
                address: await prover.getAddress(),
                // constructorArguments: [l1BlockAddressSepolia, deployer.address],
                constructorArguments: [
                    [
                        baseSepoliaChainConfiguration,
                        optimismSepoliaChainConfiguration,
                        ecoTestnetChainConfiguration,
                    ],
                ],
            });
            console.log('prover  verified at:', await prover.getAddress());
        }
    }
    catch (e) {
        console.log(`Error verifying prover`, e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
