"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("../../config/testnet/config");
const setup_1 = require("../../config/testnet/setup");
const chai_1 = require("chai");
// import { int } from 'hardhat/internal/core/params/argumentTypes'
async function getBlockRLPEncodedData() {
    console.log('In getBlockRLPEncodedData');
    const blockTag = '0xcc7205';
    const block = await setup_1.s.baseSepoliaProvider.send('eth_getBlockByNumber', [blockTag, false]);
    console.log('block: ', block);
    const rlpEncodedBlockData = (0, ethers_1.encodeRlp)([
        block.parentHash,
        block.sha3Uncles,
        block.miner,
        block.stateRoot,
        block.transactionsRoot,
        block.receiptsRoot,
        block.logsBloom,
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.difficulty)), // Add stripzeros left here
        (0, ethers_1.toBeHex)(block.number),
        (0, ethers_1.toBeHex)(block.gasLimit),
        (0, ethers_1.toBeHex)(block.gasUsed),
        block.timestamp,
        block.extraData,
        block.mixHash,
        block.nonce,
        (0, ethers_1.toBeHex)(block.baseFeePerGas),
        block.withdrawalsRoot,
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.blobGasUsed)),
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.excessBlobGas)),
        block.parentBeaconBlockRoot,
    ]);
    console.log('rlpEncodedBlockData: ', rlpEncodedBlockData);
    console.log('Block: ', blockTag);
    console.log('Calculated Block Hash: ', (0, ethers_1.solidityPackedKeccak256)(['bytes'], [rlpEncodedBlockData]));
    console.log('block.stateRoot:', block.stateRoot);
    return rlpEncodedBlockData;
}
async function getBlockRLPEncodedDataOnBaseSepoliaForEcoTestNet() {
    const blockTag = config_1.bedrock.destinationChain.endBatchBlock;
    const block = await setup_1.s.ecoTestnetProvider.send('eth_getBlockByNumber', [
        blockTag,
        false,
    ]);
    console.log('block: ', block);
    const rlpEncodedBlockData = (0, ethers_1.encodeRlp)([
        block.parentHash,
        block.sha3Uncles,
        block.miner,
        block.stateRoot,
        block.transactionsRoot,
        block.receiptsRoot,
        block.logsBloom,
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.difficulty)), // Add stripzeros left here
        (0, ethers_1.toBeHex)(block.number),
        (0, ethers_1.toBeHex)(block.gasLimit),
        (0, ethers_1.toBeHex)(block.gasUsed),
        block.timestamp,
        block.extraData,
        block.mixHash,
        block.nonce,
        (0, ethers_1.toBeHex)(block.baseFeePerGas),
        block.withdrawalsRoot,
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.blobGasUsed)),
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.excessBlobGas)),
        block.parentBeaconBlockRoot,
    ]);
    console.log('rlpEncodedBlockData: ', rlpEncodedBlockData);
    console.log('Block: ', blockTag);
    console.log('Calculated Block Hash: ', (0, ethers_1.solidityPackedKeccak256)(['bytes'], [rlpEncodedBlockData]));
    console.log('block.stateRoot:', block.stateRoot);
    return rlpEncodedBlockData;
}
function getIntentStorageSlot(intentHash) {
    return (0, ethers_1.solidityPackedKeccak256)(['bytes32', 'uint256'], [intentHash, 0]);
}
// Proving Sepolia State for BaseSepolia on ECOTestNet
async function proveSepoliaSettlementLayerStateOnEcoTestNet() {
    console.log('In proveSettlementLayerState');
    const setlementBlock = await setup_1.s.baseSepolial1Block.number();
    const settlmentBlockTag = (0, ethers_1.toQuantity)(setlementBlock);
    const block = await setup_1.s.sepoliaProvider.send('eth_getBlockByNumber', [
        settlmentBlockTag,
        false,
    ]);
    // const block: Block = await s.layer2DestinationProvider.send(
    //   'eth_getBlockByNumber',
    //   [config.cannon.layer2.endBatchBlock, false],
    // )
    console.log('block: ', block);
    let tx;
    let settlementWorldStateRoot;
    try {
        const rlpEncodedBlockData = (0, ethers_1.encodeRlp)([
            block.parentHash,
            block.sha3Uncles,
            block.miner,
            block.stateRoot,
            block.transactionsRoot,
            block.receiptsRoot,
            block.logsBloom,
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.difficulty)), // Add stripzeros left here
            (0, ethers_1.toBeHex)(block.number),
            (0, ethers_1.toBeHex)(block.gasLimit),
            (0, ethers_1.toBeHex)(block.gasUsed),
            block.timestamp,
            block.extraData,
            block.mixHash,
            block.nonce,
            (0, ethers_1.toBeHex)(block.baseFeePerGas),
            block.withdrawalsRoot,
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.blobGasUsed)),
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.excessBlobGas)),
            block.parentBeaconBlockRoot,
        ]);
        console.log('rlpEncodedBlockData: ', rlpEncodedBlockData);
        tx = await setup_1.s.ecoTestnetProverContract.proveSettlementLayerStatePriveleged((0, ethers_1.getBytes)((0, ethers_1.hexlify)(rlpEncodedBlockData)));
        await tx.wait();
        console.log('Prove Settlement world state tx: ', tx.hash);
        settlementWorldStateRoot = block.stateRoot;
        console.log('Proven L1 world state block: ', setlementBlock, settlmentBlockTag);
        console.log('Proven Settlement world state root:', settlementWorldStateRoot);
        return { settlmentBlockTag, settlementWorldStateRoot };
    }
    catch (e) {
        if (e.data && setup_1.s.baseSepoliaProverContract) {
            const decodedError = setup_1.s.baseSepoliaProverContract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
            console.log(`Error in proveSettlementLayerState:`, e.shortMessage);
        }
        else {
            console.log(`Error in proveSettlementLayerState:`, e);
        }
    }
    //   have successfully proven L1 state
}
// Proving Sepolia State for BaseSepolia on BaseSepolia
async function proveSepoliaSettlementLayerStateOnBaseSepolia() {
    console.log('In proveSettlementLayerState');
    const setlementBlock = await setup_1.s.baseSepolial1Block.number();
    const settlmentBlockTag = (0, ethers_1.toQuantity)(setlementBlock);
    const block = await setup_1.s.sepoliaProvider.send('eth_getBlockByNumber', [
        settlmentBlockTag,
        false,
    ]);
    // const block: Block = await s.layer2DestinationProvider.send(
    //   'eth_getBlockByNumber',
    //   [config.cannon.layer2.endBatchBlock, false],
    // )
    console.log('block: ', block);
    let tx;
    let settlementWorldStateRoot;
    try {
        const rlpEncodedBlockData = (0, ethers_1.encodeRlp)([
            block.parentHash,
            block.sha3Uncles,
            block.miner,
            block.stateRoot,
            block.transactionsRoot,
            block.receiptsRoot,
            block.logsBloom,
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.difficulty)), // Add stripzeros left here
            (0, ethers_1.toBeHex)(block.number),
            (0, ethers_1.toBeHex)(block.gasLimit),
            (0, ethers_1.toBeHex)(block.gasUsed),
            block.timestamp,
            block.extraData,
            block.mixHash,
            block.nonce,
            (0, ethers_1.toBeHex)(block.baseFeePerGas),
            block.withdrawalsRoot,
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.blobGasUsed)),
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(block.excessBlobGas)),
            block.parentBeaconBlockRoot,
        ]);
        console.log('rlpEncodedBlockData: ', rlpEncodedBlockData);
        tx = await setup_1.s.baseSepoliaProverContract.proveSettlementLayerState((0, ethers_1.getBytes)((0, ethers_1.hexlify)(rlpEncodedBlockData)));
        await tx.wait();
        console.log('Prove Settlement world state tx: ', tx.hash);
        settlementWorldStateRoot = block.stateRoot;
        console.log('Proven L1 world state block: ', setlementBlock, settlmentBlockTag);
        console.log('Proven Settlement world state root:', settlementWorldStateRoot);
        return { settlmentBlockTag, settlementWorldStateRoot };
    }
    catch (e) {
        if (e.data && setup_1.s.baseSepoliaProverContract) {
            const decodedError = setup_1.s.baseSepoliaProverContract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
            console.log(`Error in proveSettlementLayerState:`, e.shortMessage);
        }
        else {
            console.log(`Error in proveSettlementLayerState:`, e);
        }
    }
    //   have successfully proven L1 state
}
async function destinationStateProvingTestsEcoTestNet() {
    // Test RootClaim for Prover
    console.log('Testing rootClaim from Prover');
    const cannonRootClaimFromProver = await setup_1.s.ecoTestnetProverContract.generateOutputRoot(0, config_1.cannon.destinationChain.endBatchBlockStateRoot, config_1.cannon.destinationChain.messagePasserStateRoot, config_1.cannon.destinationChain.endBatchBlockHash);
    const cannonRootClaim = (0, ethers_1.solidityPackedKeccak256)(['uint256', 'bytes32', 'bytes32', 'bytes32'], [
        0,
        config_1.cannon.destinationChain.endBatchBlockStateRoot,
        config_1.cannon.destinationChain.messagePasserStateRoot,
        config_1.cannon.destinationChain.endBatchBlockHash,
    ]);
    (0, chai_1.expect)(cannonRootClaimFromProver).to.equal(cannonRootClaim);
    (0, chai_1.expect)(cannonRootClaimFromProver).to.equal(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.rootClaim);
    console.log('Cannon RootClaim:', cannonRootClaim);
    console.log('RootClaim from Prover matches RootClaim from Cannon');
    // Prove DisputGameFactory Storage Slot is correct
    console.log('Testing DisputeGameStorageSlot from Prover');
    const arrayLengthSlot = (0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame
        .listSlotNumber), 32);
    const firstElementSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes32'], [arrayLengthSlot]);
    const disputeGameStorageSlot = (0, ethers_1.toBeHex)(BigInt(firstElementSlot) +
        BigInt(Number(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.gameIndex)), 32);
    (0, chai_1.expect)(disputeGameStorageSlot).to.equal(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame
        .gameIDStorageSlot);
    console.log('DisputeGameStorageSlot:', disputeGameStorageSlot);
    console.log('DisputeGameStorageSlot from Prover matches DisputeGameStorageSlot from Cannon');
    // StorageProof for DisputeGameFactory
    console.log('Prove storage showing the DisputeGameFactory created the FaultDisputGame');
    console.log('gameIdRLPEncoded: ', (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.gameId))));
    await setup_1.s.ecoTestnetProverContract.proveStorage(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame
        .gameIDStorageSlot, (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.gameId))), 
    // encodeRlp(t.cannon.gameId),
    config_1.cannon.destinationChain.disputeGameFactory.storageProof, config_1.cannon.destinationChain.disputeGameFactory.stateRoot);
    console.log('Proved DisputeGameFactory StorageProof');
    // Prove DisputeGameFactory AccountProof
    console.log('Prove account showing that the above ProveStorage is for a valid WorldState');
    await setup_1.s.ecoTestnetProverContract.proveAccount(config_1.cannon.destinationChain.disputeGameFactory.address, await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.destinationChain.disputeGameFactory.contractData), config_1.cannon.destinationChain.disputeGameFactory.accountProof, config_1.cannon.settlementChain.worldStateRoot);
    console.log('Proved DisputeGameFactory AccountProof');
    // Prove FaultDisputeGame Status Storage
    console.log('Prove storage showing the FaultDisputeGame has a status which shows the Defender Won');
    await setup_1.s.ecoTestnetProverContract.proveStorage(config_1.cannon.destinationChain.faultDisputeGame.status.storageSlot, (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)(
    // stripZerosLeft(
    config_1.cannon.destinationChain.faultDisputeGame.status.storageData)), config_1.cannon.destinationChain.faultDisputeGame.status.storageProof, config_1.cannon.destinationChain.faultDisputeGame.stateRoot);
    console.log('Proved FaultDisputeGame Status Storage');
    // Prove FaultDisputeGame Root Claim Storage
    console.log('Prove storage showing the FaultDispute Game has a rootClaim which includes the L2Block');
    console.log('Encoded RLP rootClaim : ', (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(config_1.cannon.destinationChain.faultDisputeGame.rootClaim.storageData))));
    await setup_1.s.ecoTestnetProverContract.proveStorage(config_1.cannon.destinationChain.faultDisputeGame.rootClaim.storageSlot, (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(config_1.cannon.destinationChain.faultDisputeGame.rootClaim.storageData))), 
    // encodeRlp(t.cannon.faultDisputeGameRootClaimStorage),
    config_1.cannon.destinationChain.faultDisputeGame.rootClaim.storageProof, config_1.cannon.destinationChain.faultDisputeGame.stateRoot);
    console.log('Proved FaultDisputeGame Root Claim Storage');
    // Prove FaultDisputeGame AccountProof
    console.log('Prove account showing that the above ProveStorages are for a valid WorldState');
    await setup_1.s.ecoTestnetProverContract.proveAccount(config_1.cannon.destinationChain.faultDisputeGame.address, await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.destinationChain.faultDisputeGame.contractData), config_1.cannon.destinationChain.faultDisputeGame.accountProof, config_1.cannon.settlementChain.worldStateRoot);
    console.log('Proved FaultDisputeGame AccountProof');
}
async function proveWorldStateBaseSepoliaOnEcoTestNet() {
    console.log('In proveL2WorldStateBaseSepolia');
    const RLPEncodedBaseSepoliaEndBatchBlock = await getBlockRLPEncodedData();
    console.log('RLPEncodedBaseSepoliaEndBatchBlock: ', RLPEncodedBaseSepoliaEndBatchBlock);
    const RLPEncodedDisputeGameFactoryData = await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.destinationChain.disputeGameFactory.contractData);
    // Prove the L2 World State for Cannon
    const disputeGameFactoryProofData = {
        // destinationWorldStateRoot: cannon.destinationChain.endBatchBlockStateRoot,
        messagePasserStateRoot: config_1.cannon.destinationChain.messagePasserStateRoot,
        latestBlockHash: config_1.cannon.destinationChain.endBatchBlockHash,
        gameIndex: config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.gameIndex,
        // gameId: toBeHex(stripZerosLeft(config.cannon.gameId)),
        gameId: config_1.cannon.destinationChain.disputeGameFactory.faultDisputeGame.gameId,
        disputeFaultGameStorageProof: config_1.cannon.destinationChain.disputeGameFactory.storageProof,
        rlpEncodedDisputeGameFactoryData: RLPEncodedDisputeGameFactoryData,
        disputeGameFactoryAccountProof: config_1.cannon.destinationChain.disputeGameFactory.accountProof,
    };
    const RLPEncodedFaultDisputeGameData = await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.destinationChain.faultDisputeGame.contractData);
    const faultDisputeGameProofData = {
        faultDisputeGameStateRoot: config_1.cannon.destinationChain.faultDisputeGame.stateRoot,
        faultDisputeGameRootClaimStorageProof: config_1.cannon.destinationChain.faultDisputeGame.rootClaim.storageProof,
        faultDisputeGameStatusSlotData: {
            createdAt: config_1.cannon.destinationChain.faultDisputeGame.status.storage.createdAt,
            resolvedAt: config_1.cannon.destinationChain.faultDisputeGame.status.storage.resolvedAt,
            gameStatus: config_1.cannon.destinationChain.faultDisputeGame.status.storage.gameStatus,
            initialized: config_1.cannon.destinationChain.faultDisputeGame.status.storage.initialized,
            l2BlockNumberChallenged: config_1.cannon.destinationChain.faultDisputeGame.status.storage
                .l2BlockNumberChallenged,
            // filler: getBytes(
            //   cannon.destinationChain.faultDisputeGame.status.storage.filler,
            // ),
        },
        faultDisputeGameStatusStorageProof: config_1.cannon.destinationChain.faultDisputeGame.status.storageProof,
        rlpEncodedFaultDisputeGameData: RLPEncodedFaultDisputeGameData,
        faultDisputeGameAccountProof: config_1.cannon.destinationChain.faultDisputeGame.accountProof,
    };
    console.log('about to proveWorldStateCannon');
    await setup_1.s.ecoTestnetProverContract.proveWorldStateCannon(config_1.cannon.intent.destinationChainId, RLPEncodedBaseSepoliaEndBatchBlock, 
    // cannon.intent.rlpEncodedBlockData,
    config_1.cannon.destinationChain.endBatchBlockStateRoot, disputeGameFactoryProofData, faultDisputeGameProofData, config_1.cannon.settlementChain.worldStateRoot);
    console.log('Proved L2 World State Cannon');
}
async function proveWorldStateBaseSepoliaOnBaseSepolia() {
    console.log('In proveL2WorldStateBaseSepolia on BaseSepolia');
    const RLPEncodedBaseSepoliaEndBatchBlock = await getBlockRLPEncodedData();
    console.log('RLPEncodedBaseSepoliaEndBatchBlock: ', RLPEncodedBaseSepoliaEndBatchBlock);
    const RLPEncodedDisputeGameFactoryData = await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.baseSepolia.disputeGameFactory.contractData);
    // Prove the L2 World State for Cannon
    const disputeGameFactoryProofData = {
        // destinationWorldStateRoot: bedrock.baseSepolia.endBatchBlockStateRoot,
        messagePasserStateRoot: config_1.bedrock.baseSepolia.messagePasserStateRoot,
        latestBlockHash: config_1.bedrock.baseSepolia.endBatchBlockHash,
        gameIndex: config_1.bedrock.baseSepolia.disputeGameFactory.faultDisputeGame.gameIndex,
        // gameId: toBeHex(stripZerosLeft(config.cannon.gameId)),
        gameId: config_1.bedrock.baseSepolia.disputeGameFactory.faultDisputeGame.gameId,
        disputeFaultGameStorageProof: config_1.bedrock.baseSepolia.disputeGameFactory.storageProof,
        rlpEncodedDisputeGameFactoryData: RLPEncodedDisputeGameFactoryData,
        disputeGameFactoryAccountProof: config_1.bedrock.baseSepolia.disputeGameFactory.accountProof,
    };
    const RLPEncodedFaultDisputeGameData = await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.baseSepolia.faultDisputeGame.contractData);
    const faultDisputeGameProofData = {
        faultDisputeGameStateRoot: config_1.bedrock.baseSepolia.faultDisputeGame.stateRoot,
        faultDisputeGameRootClaimStorageProof: config_1.bedrock.baseSepolia.faultDisputeGame.rootClaim.storageProof,
        faultDisputeGameStatusSlotData: {
            createdAt: config_1.bedrock.baseSepolia.faultDisputeGame.status.storage.createdAt,
            resolvedAt: config_1.bedrock.baseSepolia.faultDisputeGame.status.storage.resolvedAt,
            gameStatus: config_1.bedrock.baseSepolia.faultDisputeGame.status.storage.gameStatus,
            initialized: config_1.bedrock.baseSepolia.faultDisputeGame.status.storage.initialized,
            l2BlockNumberChallenged: config_1.bedrock.baseSepolia.faultDisputeGame.status.storage
                .l2BlockNumberChallenged,
            // filler: getBytes(
            //   bedrock.baseSepolia.faultDisputeGame.status.storage.filler,
            // ),
        },
        faultDisputeGameStatusStorageProof: config_1.bedrock.baseSepolia.faultDisputeGame.status.storageProof,
        rlpEncodedFaultDisputeGameData: RLPEncodedFaultDisputeGameData,
        faultDisputeGameAccountProof: config_1.bedrock.baseSepolia.faultDisputeGame.accountProof,
    };
    console.log('about to proveWorldStateCannon');
    await setup_1.s.baseSepoliaProverContract.proveWorldStateCannon(config_1.cannon.intent.destinationChainId, RLPEncodedBaseSepoliaEndBatchBlock, 
    // cannon.intent.rlpEncodedBlockData,
    config_1.bedrock.baseSepolia.endBatchBlockStateRoot, disputeGameFactoryProofData, faultDisputeGameProofData, config_1.bedrock.settlementChain.worldStateRoot);
    console.log('Proved L2 World State Cannon on BaseSepolia');
}
// Prove Destination State of EcoTestNet on BaseSepolia (Intents from BaseSepolia to EcoTestNet)
async function destinationStateProvingTestsBaseSepolia() {
    const outputRoot = (0, ethers_1.solidityPackedKeccak256)(['uint256', 'bytes32', 'bytes32', 'bytes32'], [
        0,
        config_1.bedrock.destinationChain.worldStateRoot,
        config_1.bedrock.destinationChain.messageParserStateRoot,
        config_1.bedrock.destinationChain.endBatchBlockHash,
        // '0x0df68f220b56ca051718e18e243769fae3296859243b8cf391b9198314f7eef8',
        // '0x0dad8f82574fb890e31def513e65431fae8b7d253769c7b8a8f89d6f2a06e79c',
        // '0x6e423d26e1beba75c5d8d0f02ad9c8ae7e7085f16419b6fa4a3b9d726e1fe1bc',
    ]);
    console.log('outputRoot: ', outputRoot);
    (0, chai_1.expect)(outputRoot).to.equal('0xe9d09cfd1f37fe512729fda2b1f432c752e48c102e0d2f480d6a15478b9e70c3');
    // it('has the correct block hash', async () => {
    //   expect((await blockhashOracle.hash()) === bedrock.settlementChain.blockHash)
    // })
    // it('can prove OuputOracle storage', async () => {
    await setup_1.s.baseSepoliaProverContract.proveStorage(config_1.bedrock.baseSepolia.outputOracleStorageSlot, 
    // '0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f747F1D',
    // '0xa082af251eb4e15ec624f3a0d8e891892e45272cc3b364dec56cd00a1b2f36f62d', // prefix wih a0 because it's a 32 byte blob
    '0xa0e9d09cfd1f37fe512729fda2b1f432c752e48c102e0d2f480d6a15478b9e70c3', // prefix wih a0 because it's a 32 byte blob
    // '0xa00c8739e718656a0a335f17e926705b6c50534d4b4304a4609880e11a27f9d02e', // prefix wih a0 because it's a 32 byte blob
    config_1.bedrock.baseSepolia.storageProof, config_1.bedrock.baseSepolia.outputOracleStorageRoot);
    console.log('Proved OutputOracle Storage');
    // })
    // it('can prove OutputOracle account', async () => {
    const val = await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.destinationChain.contractData);
    setup_1.s.baseSepoliaProverContract.proveAccount(config_1.networks.baseSepolia.settlementContracts.ecoTestnet, val, config_1.bedrock.baseSepolia.accountProof, config_1.bedrock.baseSepolia.worldStateRoot);
    console.log('Proved OutputOracle Account');
}
async function proveWorldStateBedrockEcoTestNetonBaseSepolia() {
    console.log('In proveWorldStateBedrockEcoTestNetonBaseSepolia');
    const RLPEncodedEcoTestNetEndBatchBlock = await getBlockRLPEncodedDataOnBaseSepoliaForEcoTestNet();
    await setup_1.s.baseSepoliaProverContract.proveWorldStateBedrock(config_1.bedrock.intent.destinationChainId, RLPEncodedEcoTestNetEndBatchBlock, config_1.bedrock.destinationChain.worldStateRoot, config_1.bedrock.destinationChain.messageParserStateRoot, config_1.bedrock.destinationChain.batchIndex, config_1.bedrock.baseSepolia.storageProof, await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.destinationChain.contractData), config_1.bedrock.baseSepolia.accountProof, config_1.bedrock.baseSepolia.worldStateRoot);
    console.log('Proved L2 World State Bedrock EcoTestNet on BaseSepolia');
}
async function proveIntentOnEcoTestNet(intentHash) {
    console.log('In proveIntent');
    console.log('about to proveIntent');
    const intentInfo = await setup_1.s.ecoTestnetIntentSourceContractClaimant.getIntent(intentHash);
    console.log(config_1.networkIds.ecoTestnet);
    console.log(config_1.cannon.intent.destinationChainId);
    console.log(config_1.cannon.intent.targetTokens);
    console.log((0, ethers_1.getBytes)((0, ethers_1.hexlify)(config_1.cannon.intent.callData)));
    console.log('callDataRetreived: ', intentInfo[3]);
    console.log(config_1.cannon.intent.expiryTime);
    console.log(config_1.cannon.intent.nonce);
    console.log('End of intermediateHash inputs');
    const abiCoder = ethers_1.AbiCoder.defaultAbiCoder();
    const intermediateHash = (0, ethers_1.keccak256)(abiCoder.encode(['uint256', 'uint256', 'address[]', 'bytes[]', 'uint256', 'bytes32'], [
        config_1.networkIds.ecoTestnet, // sourceChainID
        intentInfo[1], // destinationChainID
        intentInfo[2], // targetTokens
        // getBytes(hexlify(cannon.intent.callData)),
        // getBytes(cannon.intent.callData),
        // getBytes(hexlify(intentInfo[3])),
        intentInfo[3],
        intentInfo[6], // expiryTime
        (0, ethers_1.getBytes)(intentInfo[8]), // nonce),
    ]));
    const calcintentHash = (0, ethers_1.keccak256)(abiCoder.encode(['address', 'bytes32'], [config_1.networks.baseSepolia.inboxAddress, intermediateHash]));
    console.log('calcintentHash: ', calcintentHash);
    // const intentStorageSlot = keccak256(
    //   abiCoder.encode(['bytes32', 'uint256'], [calcintentHash, 0]),
    // )
    const intentStorageSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes'], [setup_1.s.abiCoder.encode(['bytes32', 'uint256'], [calcintentHash, 1])]);
    console.log('intentStorageSlot: ', intentStorageSlot);
    // const intermediateHash = keccak256(
    //   abiCoder.encode(
    //     ['uint256', 'uint256', 'address[]', 'bytes[]', 'uint256', 'bytes32'],
    //     [
    //       sourceChainID,
    //       (await owner.provider.getNetwork()).chainId,
    //       [erc20Address],
    //       [calldata],
    //       timeStamp,
    //       nonce,
    //     ],
    //   ),
    console.log(config_1.cannon.intent.destinationChainId);
    console.log((0, ethers_1.getAddress)(config_1.actors.claimant));
    console.log(config_1.networks.baseSepolia.inboxAddress);
    console.log(intermediateHash);
    console.log(config_1.cannon.intent.storageProof);
    console.log(await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.intent.inboxContractData));
    console.log(config_1.cannon.intent.accountProof);
    console.log(config_1.cannon.destinationChain.endBatchBlockStateRoot);
    // Prove the Intent
    await setup_1.s.ecoTestnetProverContract.proveIntent(config_1.cannon.intent.destinationChainId, (0, ethers_1.getAddress)(config_1.actors.claimant), 
    // t.intents.optimismSepolia.rlpEncodedBlockData,
    config_1.networks.baseSepolia.inboxAddress, intermediateHash, 
    // 1, // no need to be specific about output indexes yet
    config_1.cannon.intent.storageProof, await setup_1.s.ecoTestnetProverContract.rlpEncodeDataLibList(config_1.cannon.intent.inboxContractData), config_1.cannon.intent.accountProof, config_1.cannon.destinationChain.endBatchBlockStateRoot);
    console.log('Proved Intent');
}
async function proveIntentOnBaseSepoliaFromEcoTestNet(intentHash) {
    console.log('In proveIntent on BaseSepolia from EcoTestNet');
    console.log('about to proveIntent');
    const intentInfo = await setup_1.s.baseSepoliaIntentSourceContractClaimant.getIntent(intentHash);
    console.log('End of intermediateHash inputs');
    const abiCoder = ethers_1.AbiCoder.defaultAbiCoder();
    const intermediateHash = (0, ethers_1.keccak256)(abiCoder.encode(['uint256', 'uint256', 'address[]', 'bytes[]', 'uint256', 'bytes32'], [
        config_1.networkIds.baseSepolia, // sourceChainID
        intentInfo[1], // destinationChainID
        intentInfo[2], // targetTokens
        // getBytes(hexlify(cannon.intent.callData)),
        // getBytes(cannon.intent.callData),
        // getBytes(hexlify(intentInfo[3])),
        intentInfo[3],
        intentInfo[6], // expiryTime
        (0, ethers_1.getBytes)(intentInfo[8]), // nonce),
    ]));
    const calcintentHash = (0, ethers_1.keccak256)(abiCoder.encode(['address', 'bytes32'], [config_1.networks.ecoTestnet.inboxAddress, intermediateHash]));
    console.log('calcintentHash: ', calcintentHash);
    // const intentStorageSlot = keccak256(
    //   abiCoder.encode(['bytes32', 'uint256'], [calcintentHash, 0]),
    // )
    const intentStorageSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes'], [setup_1.s.abiCoder.encode(['bytes32', 'uint256'], [calcintentHash, 1])]);
    console.log('intentStorageSlot: ', intentStorageSlot);
    console.log(config_1.bedrock.intent.destinationChainId);
    console.log((0, ethers_1.getAddress)(config_1.actors.claimant));
    console.log(config_1.networks.ecoTestnet.inboxAddress);
    console.log(intermediateHash);
    console.log(config_1.bedrock.intent.storageProof);
    console.log(await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.intent.inboxContractData));
    console.log(config_1.bedrock.intent.accountProof);
    console.log(config_1.bedrock.intent.endBatchBlockStateRoot);
    // Prove the Intent
    await setup_1.s.baseSepoliaProverContract.proveIntent(config_1.bedrock.intent.destinationChainId, (0, ethers_1.getAddress)(config_1.actors.claimant), 
    // t.intents.optimismSepolia.rlpEncodedBlockData,
    config_1.networks.ecoTestnet.inboxAddress, intermediateHash, 
    // 1, // no need to be specific about output indexes yet
    config_1.bedrock.intent.storageProof, await setup_1.s.baseSepoliaProverContract.rlpEncodeDataLibList(config_1.bedrock.intent.inboxContractData), config_1.bedrock.intent.accountProof, config_1.bedrock.intent.endBatchBlockStateRoot);
    console.log('Proved Intent');
}
async function withdrawRewardOnEcoTestNet(intentHash) {
    console.log('In withdrawReward');
    try {
        const withdrawTx = await setup_1.s.ecoTestnetIntentSourceContractClaimant.withdrawRewards(intentHash);
        await withdrawTx.wait();
        console.log('Withdrawal tx: ', withdrawTx.hash);
        return withdrawTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.ecoTestnetIntentSourceContractClaimant) {
            const decodedError = setup_1.s.ecoTestnetIntentSourceContractClaimant.interface.parseError(e.data);
            console.log(`Transaction failed in withdrawReward : ${decodedError?.name}`);
        }
        else {
            console.log(`Error in withdrawReward:`, e);
        }
    }
}
async function withdrawRewardOnBaseSepoliaFromEcoTestNet(intentHash) {
    console.log('In withdrawReward');
    try {
        const withdrawTx = await setup_1.s.baseSepoliaIntentSourceContractClaimant.withdrawRewards(intentHash);
        await withdrawTx.wait();
        console.log('Withdrawal tx: ', withdrawTx.hash);
        return withdrawTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.baseSepoliaIntentSourceContractClaimant) {
            const decodedError = setup_1.s.ecoTestnetIntentSourceContractClaimant.interface.parseError(e.data);
            console.log(`Transaction failed in withdrawReward : ${decodedError?.name}`);
        }
        else {
            console.log(`Error in withdrawReward:`, e);
        }
    }
}
async function main() {
    // define the variables used for each state of the intent lifecycle
    // Point in time proving for latest batch
    // let intentHash, intentFulfillTransaction
    try {
        console.log('In Main');
        console.log('Walkthrough of BaseSepolia to ECOTestNet');
        // get the latest world state
        await proveSepoliaSettlementLayerStateOnBaseSepolia();
        // const blockRLPEncodedData = await getBlockRLPEncodedData()
        const RLPEncodedDisputeGameFactoryData = await getBlockRLPEncodedData();
        console.log('RLPEncodedDisputeGameFactoryData: ', RLPEncodedDisputeGameFactoryData);
        const intentStorageSlot = getIntentStorageSlot(config_1.cannon.intent.intentHash);
        console.log('intentStorageSlot: ', intentStorageSlot);
        await proveSepoliaSettlementLayerStateOnEcoTestNet();
        await destinationStateProvingTestsEcoTestNet();
        await proveWorldStateBaseSepoliaOnEcoTestNet();
        await proveIntentOnEcoTestNet(config_1.cannon.intent.intentHash);
        console.log('about to withdrawReward');
        // Withdraw the Reward
        await withdrawRewardOnEcoTestNet(config_1.cannon.intent.intentHash);
        console.log('Withdrew Reward');
        console.log('Walkthrough of ECOTestNet to BaseSepolia');
        await proveSepoliaSettlementLayerStateOnBaseSepolia();
        await proveWorldStateBaseSepoliaOnBaseSepolia();
        console.log('about to proveWorldStateBedrockEcoTestNetonBaseSepolia');
        await destinationStateProvingTestsBaseSepolia();
        await proveWorldStateBedrockEcoTestNetonBaseSepolia();
        console.log('about to proveIntentOnBaseSepoliaFromEcoTestNet');
        await proveIntentOnBaseSepoliaFromEcoTestNet(config_1.bedrock.intent.intentHash);
        await proveIntentOnBaseSepoliaFromEcoTestNet(config_1.bedrock.intent.intentHash);
        console.log('about to withdrawRewardOnBaseSepoliaFromEcoTestNet');
        await withdrawRewardOnBaseSepoliaFromEcoTestNet(config_1.bedrock.intent.intentHash);
    }
    catch (e) {
        console.log(e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
