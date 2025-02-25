"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCMD = exports.getDeployChainConfig = exports.getDeployNetwork = exports.waitSeconds = exports.storageProverSupported = exports.verifyContract = exports.retryFunction = exports.waitBlocks = exports.waitForNonceUpdate = exports.waitMs = exports.isZeroAddress = void 0;
const hardhat_1 = require("hardhat");
const viem_1 = require("viem");
const config_1 = require("../config/mainnet/config");
const config_2 = require("../config/testnet/config");
const aa_core_1 = require("@alchemy/aa-core");
const chains_1 = require("viem/chains");
function isZeroAddress(address) {
    return address === viem_1.zeroAddress;
}
exports.isZeroAddress = isZeroAddress;
async function waitMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.waitMs = waitMs;
/**
 * Waits for the nonce of a client to update.
 *
 * @param client - The `viem` client instance.
 * @param address - The Ethereum address to monitor.
 * @param currentNonce - The current nonce to compare against.
 * @param pollInterval - The interval (in ms) for polling the nonce (default: NONCE_POLL_INTERVAL).
 * @param txCall - The transaction call to make. Must update the nonce by at least 1 or this function will hang and timeout.
 * @returns A promise that resolves to the updated nonce.
 */
async function waitForNonceUpdate(client, address, pollInterval, txCall) {
    const getNonce = async (blockTag) => {
        return await client.getTransactionCount({ address, blockTag });
    };
    const initialNonce = await getNonce('pending');
    const result = await txCall();
    // some nodes in the rpc might not be updated even when the one we hit at first is causing a nonce error down the line
    await new Promise((resolve) => setTimeout(resolve, pollInterval / 10));
    let latestNonce = await getNonce('latest');
    while (latestNonce <= initialNonce) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        latestNonce = await getNonce('latest');
    }
    return result;
}
exports.waitForNonceUpdate = waitForNonceUpdate;
async function waitBlocks(provider, blocks = 5) {
    const tillBlock = (await provider.getBlockNumber()) + blocks;
    await new Promise((resolve) => {
        provider.on('block', (blockNumber) => {
            if (blockNumber === tillBlock) {
                console.log(`finished block ${blockNumber}, after waiting for ${blocks} blocks`);
                resolve();
            }
        });
    });
}
exports.waitBlocks = waitBlocks;
/**
 * This method waits on a function to return a non-falsy value for a certain number of blocks
 *
 * @param func the asyn function to call
 * @param options options for the waitBlocks function
 * @returns the result of the function
 */
async function retryFunction(func, provider, ops = { blocks: 25 }) {
    const maxWaitBlock = (await provider.getBlockNumber()) + ops.blocks;
    let ans;
    let err = new Error('waiting on function failed');
    while (!ans) {
        try {
            ans = await func();
            if (ans) {
                return ans;
            }
        }
        catch (e) {
            err = e;
        }
        const currentBlock = await provider.getBlockNumber();
        if (currentBlock >= maxWaitBlock) {
            console.log('Reached maximum wait time at block: ', currentBlock);
            break;
        }
    }
    console.log('Error waiting on function: ', err);
}
exports.retryFunction = retryFunction;
async function verifyContract(provider, contractName, address, args) {
    // wait for 60 for the api endpoint to sync with the rpc
    await waitSeconds(60);
    try {
        await retryFunction(async () => {
            const code = await provider.getCode(address);
            if (code.length > 3) {
                console.log(`${address} has code:`, code.substring(0, 10) + '...');
                return code;
            }
            await waitBlocks(provider);
        }, provider);
        await (0, hardhat_1.run)('verify:verify', {
            address,
            constructorArguments: args,
        });
        console.log(`${contractName} verified at:`, address);
        return await provider.getCode(address);
    }
    catch (e) {
        console.log(`Error verifying ${contractName}: `, e);
    }
}
exports.verifyContract = verifyContract;
/**
 * Checks if the storage Prover is supported on a network
 * @param network the network to check
 * @param contractName the network to check
 * @returns
 */
function storageProverSupported(chainID, contractName) {
    let supported = false;
    switch (chainID) {
        case aa_core_1.base.id:
        case aa_core_1.baseSepolia.id:
        case aa_core_1.optimism.id:
        case aa_core_1.optimismSepolia.id:
        case chains_1.mantle.id:
        case chains_1.mantleSepoliaTestnet.id:
            supported = true;
            break;
        default:
            supported = false;
    }
    return supported || contractName !== 'Prover';
}
exports.storageProverSupported = storageProverSupported;
async function waitSeconds(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}
exports.waitSeconds = waitSeconds;
function getDeployNetwork(networkName) {
    // mainnet
    switch (networkName) {
        case 'base':
            return config_1.networks.base;
        case 'optimism':
            return config_1.networks.optimism;
        case 'helix':
            return config_1.networks.helix;
        case 'arbitrum':
            return config_1.networks.arbitrum;
        case 'mantle':
            return config_1.networks.mantle;
        case 'polygon':
            return config_1.networks.polygon;
        case 'abstract':
            return config_1.networks.abstract;
    }
    // sepolia
    switch (networkName) {
        case 'baseSepolia':
            return config_2.networks.baseSepolia;
        case 'optimismSepolia':
            return config_2.networks.optimismSepolia;
        case 'optimismSepoliaBlockscout':
            return config_2.networks.optimismSepolia;
        case 'ecoTestnet':
            return config_2.networks.ecoTestnet;
        case 'arbitrumSepolia':
            return config_2.networks.arbitrumSepolia;
        case 'mantleSepolia':
            return config_2.networks.mantleSepolia;
        case 'polygonSepolia':
            return config_2.networks.polygonSepolia;
        case 'abstractTestnet':
            return config_2.networks.abstractTestnet;
        case 'curtisTestnet':
            return config_2.networks.curtisTestnet;
        case 'mantaSepolia':
            return config_2.networks.mantaSepolia;
    }
    throw new Error('Network not found');
}
exports.getDeployNetwork = getDeployNetwork;
function getDeployChainConfig(chain) {
    // mainnet
    switch (chain) {
        case aa_core_1.base:
            return config_1.networks.base;
        case aa_core_1.optimism:
            return config_1.networks.optimism;
        // case 'helix':
        //   return mainnetNetworks.helix
        case aa_core_1.arbitrum:
            return config_1.networks.arbitrum;
        case chains_1.mantle:
            return config_1.networks.mantle;
        case chains_1.polygon:
            return config_1.networks.polygon;
        case chains_1.abstract:
            return config_1.networks.abstract;
    }
    // sepolia
    switch (chain) {
        case aa_core_1.baseSepolia:
            return config_2.networks.baseSepolia;
        case aa_core_1.optimismSepolia:
            return config_2.networks.optimismSepolia;
        // case 'ecoTestnet':
        //   return sepoliaNetworks.ecoTestnet
        case aa_core_1.arbitrumSepolia:
            return config_2.networks.arbitrumSepolia;
        case chains_1.mantleSepoliaTestnet:
            return config_2.networks.mantleSepolia;
        case chains_1.polygonAmoy:
            return config_2.networks.polygonSepolia;
        case chains_1.abstractTestnet:
            return config_2.networks.abstractTestnet;
    }
    throw new Error('Network not found');
}
exports.getDeployChainConfig = getDeployChainConfig;
async function execCMD(command, options = {}) {
    return new Promise((resolve, reject) => {
        // This is running locally so ignore github specific commands
        if (command.includes('>>') && !process.env.GITHUB_ENV) {
            const skipMessage = 'Command contains >>, skipping execution';
            console.log(skipMessage);
            resolve(skipMessage);
        }
        else {
            const { exec } = require('child_process');
            exec(command, options, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    console.error(`stderr: ${stderr}`);
                    reject(error);
                    return;
                }
                console.log(stdout);
                resolve(stdout);
            });
        }
    });
}
exports.execCMD = execCMD;
