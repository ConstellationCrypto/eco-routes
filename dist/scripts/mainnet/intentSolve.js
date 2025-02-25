"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseOptimismIntentSolve = exports.optimismBaseIntentSolve = void 0;
const encode_1 = require("../../utils/encode");
const ethers_1 = require("ethers");
const config_1 = require("../../config/mainnet/config");
const setup_1 = require("../../config/mainnet/setup");
async function optimismBaseIntentSolve() {
    console.log('In createIntent optimismBase');
    const optimismIntentCreatorNonceManager = new ethers_1.NonceManager(setup_1.s.optimismIntentCreator);
    // approve lockup
    const rewardToken = setup_1.s.optimismUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.optimism.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    optimismIntentCreatorNonceManager.increment();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.optimismProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.optimismIntentSourceContractIntentCreator.createIntent(config_1.networkIds.base, // desination chainId
        config_1.networks.base.inboxAddress, // destination inbox address
        [config_1.networks.base.usdcAddress], // target Tokens
        data, // call datat for destination chain
        [config_1.networks.optimism.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.optimism.proverContractAddress);
        await intentTx.wait();
        console.log('Intent Creation tx: ', intentTx.hash);
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.optimismIntentSourceContractIntentCreator.queryFilter(setup_1.s.optimismIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
    }
    catch (e) {
        if (e.data && setup_1.s.baseIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.baseIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    console.log('In fulfillIntent');
    const baseSolverNonceManager = new ethers_1.NonceManager(setup_1.s.baseSolver);
    try {
        // get intent Information
        const thisIntent = await setup_1.s.optimismIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.baseUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.base.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        baseSolverNonceManager.increment();
        // fulfill the intent
        const fulfillTx = await setup_1.s.baseInboxContractSolver.fulfillStorage(config_1.networkIds.optimism, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // call Data
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.baseInboxContractSolver) {
            const decodedError = setup_1.s.baseInboxContractSolver.interface.parseError(e.data);
            console.log(`Transaction failed in fulfillIntent : ${decodedError?.name}`);
            console.log('fulfillIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in fulfillIntent:`, e);
        }
    }
}
exports.optimismBaseIntentSolve = optimismBaseIntentSolve;
async function baseOptimismIntentSolve() {
    console.log('In createIntent baseOptimism');
    const baseIntentCreatorNonceManager = new ethers_1.NonceManager(setup_1.s.baseIntentCreator);
    // approve lockup
    const rewardToken = setup_1.s.baseUSDCContractIntentCreator;
    const approvalTx = await rewardToken.approve(config_1.networks.base.intentSourceAddress, config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    baseIntentCreatorNonceManager.increment();
    // get the block before creating the intent
    const latestBlock = await setup_1.s.baseProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash;
    try {
        const intentTx = await setup_1.s.baseIntentSourceContractIntentCreator.createIntent(config_1.networkIds.optimism, // desination chainId
        config_1.networks.optimism.inboxAddress, // destination inbox address
        [config_1.networks.optimism.usdcAddress], // target Tokens
        data, // call datat for destination chain
        [config_1.networks.base.usdcAddress], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        config_1.networks.base.proverContractAddress);
        await intentTx.wait();
        console.log('Intent Creation tx: ', intentTx.hash);
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await setup_1.s.baseIntentSourceContractIntentCreator.queryFilter(setup_1.s.baseIntentSourceContractIntentCreator.getEvent('IntentCreated'), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
    }
    catch (e) {
        if (e.data && setup_1.s.baseIntentSourceContractIntentCreator) {
            const decodedError = setup_1.s.baseIntentSourceContractIntentCreator.interface.parseError(e.data);
            console.log(`Transaction failed in createIntent : ${decodedError?.name}`);
            console.log('createIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in createIntent:`, e);
        }
    }
    console.log('In fulfillIntent');
    const optimismSolverNonceManager = new ethers_1.NonceManager(setup_1.s.optimismSolver);
    try {
        // get intent Information
        const thisIntent = await setup_1.s.baseIntentSourceContractIntentCreator.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const targetToken = setup_1.s.optimismUSDCContractSolver;
        const fundTx = await targetToken.transfer(config_1.networks.optimism.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        optimismSolverNonceManager.increment();
        // fulfill the intent
        const fulfillTx = await setup_1.s.optimismInboxContractSolver.fulfillStorage(config_1.networkIds.base, // source chainId
        thisIntent.targets.toArray(), // target  token addresses
        thisIntent.data.toArray(), // call Data
        thisIntent.expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.claimant, // claimant
        intentHash);
        await fulfillTx.wait();
        console.log('Fulfillment tx: ', fulfillTx.hash);
        return fulfillTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.baseInboxContractSolver) {
            const decodedError = setup_1.s.baseInboxContractSolver.interface.parseError(e.data);
            console.log(`Transaction failed in fulfillIntent : ${decodedError?.name}`);
            console.log('fulfillIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in fulfillIntent:`, e);
        }
    }
}
exports.baseOptimismIntentSolve = baseOptimismIntentSolve;
async function main() {
    // define the variables used for each state of the intent lifecycle
    try {
        console.log('In Main');
        await optimismBaseIntentSolve();
        await baseOptimismIntentSolve();
    }
    catch (e) {
        console.log(e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
