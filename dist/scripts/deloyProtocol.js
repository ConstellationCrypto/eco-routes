"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMetalayerProver = exports.deployHyperProver = exports.deployInbox = exports.deployIntentSource = exports.deployProver = exports.deployProtocol = exports.getEmptyProtocolDeploy = exports.ALCHEMY_API_KEY = void 0;
const hardhat_1 = require("hardhat");
const addresses_1 = require("./deploy/addresses");
const viem_1 = require("viem");
const utils_1 = require("./utils");
const gitUtils_1 = require("./publish/gitUtils");
exports.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const singletonFactoryAddress = '0xce0042B868300000d44A59004Da54A005ffdcf9f';
function getEmptyProtocolDeploy() {
    return {
        proverAddress: viem_1.zeroAddress,
        intentSourceAddress: viem_1.zeroAddress,
        inboxAddress: viem_1.zeroAddress,
        hyperProverAddress: viem_1.zeroAddress,
        metalayerProverAddress: viem_1.zeroAddress,
        initialSalt: (0, gitUtils_1.getGitHash)(), // + Math.random().toString(), // randomize the salt for development as singletonDeployer.deploy(..) will fail if salt is already used
    };
}
exports.getEmptyProtocolDeploy = getEmptyProtocolDeploy;
async function deployProtocol(protocolDeploy, deployNetwork, solver, proverConfig, options = { isSolvingPublic: true }) {
    const networkName = deployNetwork.network;
    const salt = hardhat_1.ethers.keccak256(hardhat_1.ethers.toUtf8Bytes(protocolDeploy.initialSalt + deployNetwork.pre || ''));
    const [deployer] = await hardhat_1.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    if (process.env.DEPLOY_CI === 'true') {
        console.log('Deploying for CI');
    }
    const singletonDeployer = (await hardhat_1.ethers.getContractAt('Deployer', '0xce0042B868300000d44A59004Da54A005ffdcf9f'));
    console.log('gasLimit:', deployNetwork.gasLimit);
    const pre = deployNetwork.pre ? ' Pre' : '';
    console.log(`***************************************************`);
    console.log(`** Deploying contracts to ${networkName + pre} network **`);
    console.log(`***************************************************`);
    // Deploys the storage prover
    // if (isZeroAddress(protocolDeploy.proverAddress)) {
    //   await deployProver(salt, deployNetwork, singletonDeployer, proverConfig)
    // }
    if ((0, utils_1.isZeroAddress)(protocolDeploy.intentSourceAddress)) {
        protocolDeploy.intentSourceAddress = (await deployIntentSource(deployNetwork, salt, singletonDeployer));
    }
    if ((0, utils_1.isZeroAddress)(protocolDeploy.inboxAddress)) {
        protocolDeploy.inboxAddress = (await deployInbox(deployNetwork, deployer, options.isSolvingPublic, [solver], salt, singletonDeployer));
    }
    if ((0, utils_1.isZeroAddress)(protocolDeploy.hyperProverAddress) &&
        !(0, utils_1.isZeroAddress)(protocolDeploy.inboxAddress)) {
        protocolDeploy.hyperProverAddress = (await deployHyperProver(deployNetwork, protocolDeploy.inboxAddress, salt, singletonDeployer));
    }
    if ((0, utils_1.isZeroAddress)(protocolDeploy.metalayerProverAddress) &&
        !(0, utils_1.isZeroAddress)(protocolDeploy.inboxAddress)) {
        protocolDeploy.metalayerProverAddress = (await deployMetalayerProver(deployNetwork, protocolDeploy.inboxAddress, salt, singletonDeployer));
    }
    // deploy preproduction contracts
    if (options.deployPre) {
        deployNetwork.pre = true;
        await deployProtocol(getEmptyProtocolDeploy(), deployNetwork, solver, proverConfig);
    }
}
exports.deployProtocol = deployProtocol;
async function deployProver(deploySalt, deployNetwork, singletonDeployer, deployArgs) {
    if (!(0, utils_1.storageProverSupported)(deployNetwork.chainId, "Proverß")) {
        console.log(`Unsupported network ${deployNetwork.network} detected, skipping storage Prover deployment`);
        return;
    }
    const contractName = 'Prover';
    const proverFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const proverTx = await proverFactory.getDeployTransaction(deployArgs);
    await (0, utils_1.retryFunction)(async () => {
        return await singletonDeployer.deploy(proverTx.data, deploySalt, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    // wait to verify contract
    const proverAddress = hardhat_1.ethers.getCreate2Address(singletonFactoryAddress, deploySalt, hardhat_1.ethers.keccak256(proverTx.data));
    console.log(`${contractName} implementation deployed to: `, proverAddress);
    (0, addresses_1.addJsonAddress)(deployNetwork, `${contractName}`, proverAddress);
    (0, utils_1.verifyContract)(hardhat_1.ethers.provider, contractName, proverAddress, [deployArgs]);
    return proverAddress;
}
exports.deployProver = deployProver;
async function deployIntentSource(deployNetwork, deploySalt, singletonDeployer) {
    const contractName = 'IntentSource';
    const intentSourceFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const intentSourceTx = await intentSourceFactory.getDeployTransaction();
    const deployTx = await singletonDeployer.deploy(intentSourceTx.data, deploySalt, { gasLimit: deployNetwork.gasLimit });
    const intentSourceAddress = hardhat_1.ethers.getCreate2Address(singletonFactoryAddress, deploySalt, hardhat_1.ethers.keccak256(intentSourceTx.data));
    console.log(`${contractName} deployed to:`, intentSourceAddress);
    (0, addresses_1.addJsonAddress)(deployNetwork, `${contractName}`, intentSourceAddress);
    (0, utils_1.verifyContract)(hardhat_1.ethers.provider, contractName, intentSourceAddress, []);
    return intentSourceAddress;
}
exports.deployIntentSource = deployIntentSource;
async function deployInbox(deployNetwork, inboxOwnerSigner, isSolvingPublic, solvers, deploySalt, singletonDeployer) {
    const contractName = 'Inbox';
    const inboxFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const args = [await inboxOwnerSigner.getAddress(), isSolvingPublic, solvers];
    // on testnet inboxOwner is the deployer, just to make things easier
    const inboxTx = (await (0, utils_1.retryFunction)(async () => {
        return await inboxFactory.getDeployTransaction(args[0], args[1], args[2]);
    }, hardhat_1.ethers.provider));
    await (0, utils_1.retryFunction)(async () => {
        return await singletonDeployer.deploy(inboxTx.data, deploySalt, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    // wait to verify contract
    const inboxAddress = hardhat_1.ethers.getCreate2Address(singletonFactoryAddress, deploySalt, hardhat_1.ethers.keccak256(inboxTx.data));
    // on testnet inboxOwner is the deployer, just to make things easier
    const inbox = (await (0, utils_1.retryFunction)(async () => {
        return await hardhat_1.ethers.getContractAt(contractName, inboxAddress, inboxOwnerSigner);
    }, hardhat_1.ethers.provider));
    await (0, utils_1.retryFunction)(async () => {
        return await inbox
            .connect(inboxOwnerSigner)
            .setMailbox(deployNetwork.hyperlaneMailboxAddress, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    await (0, utils_1.retryFunction)(async () => {
        return await inbox
            .connect(inboxOwnerSigner)
            .setRouter(deployNetwork.metalayerRouterAddress, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    console.log(`${contractName} implementation deployed to: `, inboxAddress);
    (0, addresses_1.addJsonAddress)(deployNetwork, `${contractName}`, inboxAddress);
    (0, utils_1.verifyContract)(hardhat_1.ethers.provider, contractName, inboxAddress, args);
    return inboxAddress;
}
exports.deployInbox = deployInbox;
async function deployHyperProver(deployNetwork, inboxAddress, deploySalt, singletonDeployer) {
    const contractName = 'HyperProver';
    const hyperProverFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const args = [deployNetwork.hyperlaneMailboxAddress, inboxAddress];
    const hyperProverTx = (await (0, utils_1.retryFunction)(async () => {
        return await hyperProverFactory.getDeployTransaction(args[0], args[1]);
    }, hardhat_1.ethers.provider));
    await (0, utils_1.retryFunction)(async () => {
        return await singletonDeployer.deploy(hyperProverTx.data, deploySalt, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    // wait to verify contract
    const hyperProverAddress = hardhat_1.ethers.getCreate2Address(singletonFactoryAddress, deploySalt, hardhat_1.ethers.keccak256(hyperProverTx.data));
    console.log(`${contractName} deployed to: ${hyperProverAddress}`);
    (0, addresses_1.addJsonAddress)(deployNetwork, `${contractName}`, hyperProverAddress);
    (0, utils_1.verifyContract)(hardhat_1.ethers.provider, contractName, hyperProverAddress, args);
    return hyperProverAddress;
}
exports.deployHyperProver = deployHyperProver;
async function deployMetalayerProver(deployNetwork, inboxAddress, deploySalt, singletonDeployer) {
    const contractName = 'MetalayerProver';
    const metalayerProverFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const args = [deployNetwork.metalayerRouterAddress, inboxAddress];
    const metalayerProverTx = (await (0, utils_1.retryFunction)(async () => {
        return await metalayerProverFactory.getDeployTransaction(args[0], args[1]);
    }, hardhat_1.ethers.provider));
    await (0, utils_1.retryFunction)(async () => {
        return await singletonDeployer.deploy(metalayerProverTx.data, deploySalt, {
            gasLimit: deployNetwork.gasLimit,
        });
    }, hardhat_1.ethers.provider);
    const metalayerProverAddress = hardhat_1.ethers.getCreate2Address(singletonFactoryAddress, deploySalt, hardhat_1.ethers.keccak256(metalayerProverTx.data));
    console.log(`${contractName} deployed to:`, metalayerProverAddress);
    (0, addresses_1.addJsonAddress)(deployNetwork, `${contractName}`, metalayerProverAddress);
    (0, utils_1.verifyContract)(hardhat_1.ethers.provider, contractName, metalayerProverAddress, args);
    return metalayerProverAddress;
}
exports.deployMetalayerProver = deployMetalayerProver;
