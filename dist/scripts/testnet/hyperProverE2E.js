"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hyperproveInstant = exports.ALCHEMY_API_KEY = void 0;
const hardhat_1 = require("hardhat");
const promises_1 = require("timers/promises");
const ethers_1 = require("ethers");
const encode_1 = require("../../utils/encode");
const config_1 = require("../../config/testnet/config");
const setup_1 = require("../../config/testnet/setup");
exports.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
let sourceNetwork, destinationNetwork;
let sourceProvider;
let intentCreator;
let solver;
const baseSepoliaProvider = new ethers_1.AlchemyProvider(config_1.networks.baseSepolia.network, exports.ALCHEMY_API_KEY);
const optimismSepoliaProvider = new ethers_1.AlchemyProvider(config_1.networks.optimismSepolia.network, exports.ALCHEMY_API_KEY);
console.log('Testing hyperproving across base and optimism testnets');
async function main() {
    ;
    [sourceNetwork, destinationNetwork] = [
        config_1.networks.baseSepolia,
        config_1.networks.optimismSepolia,
    ];
    sourceProvider = baseSepoliaProvider;
    intentCreator = setup_1.s.baseSepoliaIntentCreator;
    solver = setup_1.s.optimismSepoliaSolver;
    console.log(`From ${sourceNetwork.network} to ${destinationNetwork.network}:`);
    await hyperproveInstant();
    [sourceNetwork, destinationNetwork] = [
        config_1.networks.optimismSepolia,
        config_1.networks.baseSepolia,
    ];
    sourceProvider = optimismSepoliaProvider;
    intentCreator = setup_1.s.optimismSepoliaIntentCreator;
    solver = setup_1.s.baseSepoliaSolver;
    console.log(`From ${sourceNetwork.network} to ${destinationNetwork.network}:`);
    await hyperproveInstant();
}
async function hyperproveInstant() {
    const rewardToken = await hardhat_1.ethers.getContractAt('ERC20', sourceNetwork.usdcAddress, intentCreator);
    const intentSource = await hardhat_1.ethers.getContractAt('IntentSource', sourceNetwork.intentSourceAddress, intentCreator);
    const targetToken = await hardhat_1.ethers.getContractAt('ERC20', destinationNetwork.usdcAddress, solver);
    const inbox = await hardhat_1.ethers.getContractAt('Inbox', destinationNetwork.inboxAddress, solver);
    const hyperprover = await hardhat_1.ethers.getContractAt('HyperProver', sourceNetwork.hyperProverContractAddress, intentCreator);
    const approvalTx = await rewardToken.approve(await intentSource.getAddress(), config_1.intent.rewardAmounts[0]);
    await approvalTx.wait();
    // get the block before creating the intent
    const latestBlock = await sourceProvider.getBlock('latest');
    const latestBlockNumberHex = (0, ethers_1.toQuantity)(latestBlock.number);
    // create intent
    const data = [
        await (0, encode_1.encodeTransfer)(config_1.actors.recipient, config_1.intent.targetAmounts[0]),
    ];
    const expiryTime = latestBlock?.timestamp + config_1.intent.duration;
    let intentHash = '';
    try {
        const intentTx = await intentSource.createIntent(destinationNetwork.chainId, // desination chainId
        destinationNetwork.inboxAddress, // destination inbox address
        [await targetToken.getAddress()], // target Tokens
        data, // calldata for destination chain
        [await rewardToken.getAddress()], // reward Tokens on source chain
        config_1.intent.rewardAmounts, // reward amounts on source chain
        expiryTime, // intent expiry time
        sourceNetwork.hyperProverContractAddress);
        await intentTx.wait();
        // Get the event from the latest Block checking transaction hash
        const intentHashEvents = await intentSource.queryFilter(intentSource.filters.IntentCreated(), latestBlockNumberHex);
        for (const intentHashEvent of intentHashEvents) {
            //   console.log(intentHashEvent.topics[1])
            if (intentHashEvent.transactionHash === intentTx.hash) {
                intentHash = intentHashEvent.topics[1];
                break;
            }
        }
        console.log('Created Intent Hash: ', intentHash);
        console.log('Intent Creation tx: ', intentTx.hash);
    }
    catch (e) {
        if (e.data && intentSource) {
            const decodedError = intentSource.interface.parseError(e.data);
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
        const thisIntent = await intentSource.getIntent(intentHash);
        // transfer the intent tokens to the Inbox Contract
        const fundTx = await targetToken.transfer(destinationNetwork.inboxAddress, config_1.intent.targetAmounts[0]);
        await fundTx.wait();
        // fulfill the intent
        const messageBody = ethers_1.AbiCoder.defaultAbiCoder().encode(['bytes[]', 'address[]'], 
        //   [thisIntent.data.toArray(), thisIntent.targets.toArray()],
        [[intentHash], [config_1.actors.recipient]]);
        console.log('fetching fee');
        const fee = await inbox.fetchFee(sourceNetwork.chainId, messageBody, (0, ethers_1.zeroPadValue)(sourceNetwork.hyperProverContractAddress, 32));
        console.log(`got the fee: ${fee}`);
        const fulfillTx = await inbox.fulfillHyperInstant(sourceNetwork.chainId, // source chainId
        [await targetToken.getAddress()], // target  token addresses
        data, // calldata
        expiryTime, // expiry time
        thisIntent.nonce, // nonce
        config_1.actors.recipient, // recipient
        intentHash, // expected intent hash
        sourceNetwork.hyperProverContractAddress, // hyperprover contract address
        { value: fee });
        console.log('Fulfillment tx: ', fulfillTx.hash);
    }
    catch (e) {
        console.log(inbox.interface.parseError(e.data));
    }
    console.log('Waiting for the dust to settle');
    await (0, promises_1.setTimeout)(45000);
    console.log('show me da money');
    const intentProvenEvents = await hyperprover
        .connect(intentCreator)
        .queryFilter(hyperprover.getEvent('IntentProven'), latestBlockNumberHex);
    for (const event of intentProvenEvents) {
        if ((intentHash = event.topics[1])) {
            console.log('it hath been proven');
            break;
        }
    }
    const initialBalance = await rewardToken.balanceOf(config_1.actors.recipient);
    const tx = await intentSource.withdrawRewards(intentHash);
    await tx.wait();
    if ((await rewardToken.balanceOf(config_1.actors.recipient)) > initialBalance) {
        console.log('great success');
    }
}
exports.hyperproveInstant = hyperproveInstant;
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
