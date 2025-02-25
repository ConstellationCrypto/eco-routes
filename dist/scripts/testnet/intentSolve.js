"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ecoTestnetOptimismSepoliaIntentSolve = exports.optimismSepoliaEcoTestNetIntentSolve = exports.optimismSepoliaBaseSepoliaIntentSolve = exports.baseSepoliaOptimismSepoliaIntentSolve = exports.ecoTestnetBaseSepoliaIntentSolve = exports.baseSepoliaEcoTestNetIntentSolve = void 0;
const encode_1 = require("../../utils/encode");
const ethers_1 = require("ethers");
const config_1 = require("../../config/testnet/config");
const setup_1 = require("../../config/testnet/setup");
async function baseSepoliaEcoTestNetIntentSolve() {
    console.log('In createIntent BaseSepoliaEcoTestNet');
    // approve lockup
    const rewardToken = setup_1.s.baseSepoliaUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.baseSepolia.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.baseSepoliaProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.createIntent(config_1.networkIds.ecoTestnet, // desination chainId
        config_1.networks.ecoTestnet.inboxAddress, // destination inbox address
        [config_1.networks.ecoTestnet.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.baseSepolia.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.baseSepolia.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.queryFilter(setup_1.s.baseSepoliaIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.baseSepoliaIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.baseSepoliaIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.ecoTestnetUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.ecoTestnet.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.ecoTestnetInboxContractSolver.fulfillStorage(config_1.networkIds.baseSepolia, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.baseSepoliaEcoTestNetIntentSolve = baseSepoliaEcoTestNetIntentSolve;
async function ecoTestnetBaseSepoliaIntentSolve() {
    console.log('In createIntent EcoTestNetBaseSepolia');
    // approve lockup
    const rewardToken = setup_1.s.ecoTestnetUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.ecoTestnet.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.ecoTestnetProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.createIntent(config_1.networkIds.baseSepolia, // desination chainId
        config_1.networks.baseSepolia.inboxAddress, // destination inbox address
        [config_1.networks.baseSepolia.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.ecoTestnet.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.ecoTestnet.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.queryFilter(setup_1.s.ecoTestnetIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.ecoTestnetIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.ecoTestnetIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.baseSepoliaUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.baseSepolia.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.baseSepoliaInboxContractSolver.fulfillStorage(config_1.networkIds.ecoTestnet, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.ecoTestnetBaseSepoliaIntentSolve = ecoTestnetBaseSepoliaIntentSolve;
async function baseSepoliaOptimismSepoliaIntentSolve() {
    console.log('In createIntent BaseSepoliaOptimismSepolia');
    // approve lockup
    const rewardToken = setup_1.s.baseSepoliaUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.baseSepolia.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.baseSepoliaProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.createIntent(config_1.networkIds.optimismSepolia, // desination chainId
        config_1.networks.optimismSepolia.inboxAddress, // destination inbox address
        [config_1.networks.optimismSepolia.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.baseSepolia.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.baseSepolia.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.queryFilter(setup_1.s.baseSepoliaIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.baseSepoliaIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.baseSepoliaIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.baseSepoliaIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.optimismSepoliaUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.optimismSepolia.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.optimismSepoliaInboxContractSolver.fulfillStorage(config_1.networkIds.baseSepolia, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.baseSepoliaOptimismSepoliaIntentSolve = baseSepoliaOptimismSepoliaIntentSolve;
async function optimismSepoliaBaseSepoliaIntentSolve() {
    console.log('In createIntent OptimismSepoliaBaseSepolia');
    // approve lockup
    const rewardToken = setup_1.s.optimismSepoliaUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.optimismSepolia.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.optimismSepoliaProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.createIntent(config_1.networkIds.baseSepolia, // desination chainId
        config_1.networks.baseSepolia.inboxAddress, // destination inbox address
        [config_1.networks.baseSepolia.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.optimismSepolia.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.optimismSepolia.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.queryFilter(setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.optimismSepoliaIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.baseSepoliaUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.baseSepolia.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.baseSepoliaInboxContractSolver.fulfillStorage(config_1.networkIds.optimismSepolia, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.optimismSepoliaBaseSepoliaIntentSolve = optimismSepoliaBaseSepoliaIntentSolve;
async function optimismSepoliaEcoTestNetIntentSolve() {
    console.log('In createIntent OptimismSepoliaEcoTestNet');
    // approve lockup
    const rewardToken = setup_1.s.optimismSepoliaUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.optimismSepolia.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.optimismSepoliaProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.createIntent(config_1.networkIds.ecoTestnet, // desination chainId
        config_1.networks.ecoTestnet.inboxAddress, // destination inbox address
        [config_1.networks.ecoTestnet.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.optimismSepolia.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.optimismSepolia.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.queryFilter(setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.optimismSepoliaIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.optimismSepoliaIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.ecoTestnetUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.ecoTestnet.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.ecoTestnetInboxContractSolver.fulfillStorage(config_1.networkIds.optimismSepolia, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.optimismSepoliaEcoTestNetIntentSolve = optimismSepoliaEcoTestNetIntentSolve;
async function ecoTestnetOptimismSepoliaIntentSolve() {
    console.log('In createIntent ecoTestnetOptimismSepolia');
    // approve lockup
    const rewardToken = setup_1.s.ecoTestnetUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.ecoTestnet.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.ecoTestnetProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.createIntent(config_1.networkIds.optimismSepolia, // desination chainId
        config_1.networks.optimismSepolia.inboxAddress, // destination inbox address
        [config_1.networks.optimismSepolia.usdcAddress], // target Tokens
        data, // calldata for destination chain
        [config_1.networks.ecoTestnet.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.ecoTestnet.proverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.queryFilter(setup_1.s.ecoTestnetIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && setup_1.s.ecoTestnetIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.ecoTestnetIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    // console.log('In fulfillIntent')
    try {
        // get intent Information
        const thisIntent = await setup_1.s.ecoTestnetIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.optimismSepoliaUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.optimismSepolia.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const fulfillTx = await setup_1.s.optimismSepoliaInboxContractSolver.fulfillStorage(config_1.networkIds.ecoTestnet, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // calldata
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        console.log(e);
    }
}
exports.ecoTestnetOptimismSepoliaIntentSolve = ecoTestnetOptimismSepoliaIntentSolve;
async function main() {
    // define the variables used for each state of the intent lifecycle
    try {
        console.log('In Main');
        await baseSepoliaEcoTestNetIntentSolve();
        await ecoTestnetBaseSepoliaIntentSolve();
        await baseSepoliaOptimismSepoliaIntentSolve();
        await optimismSepoliaBaseSepoliaIntentSolve();
        await optimismSepoliaEcoTestNetIntentSolve();
        await ecoTestnetOptimismSepoliaIntentSolve();
    }
    catch (e) {
        console.log(e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
