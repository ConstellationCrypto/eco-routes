"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("../../config/mainnet/config");
const setup_1 = require("../../config/mainnet/setup");
const FaultDisputeGameArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/FaultDisputeGame.sol/FaultDisputeGame.json"));
async function getOptimismRLPEncodedBlock(block) {
    console.log('In getOptimismRLPEncodedBlock');
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
    return rlpEncodedBlockData;
}
async function proveSettlementLayerState() {
    console.log('In proveSettlementLayerState');
    const settlementBlock = await setup_1.s.basel1Block.number();
    const settlementBlockTag = (0, ethers_1.toQuantity)(settlementBlock);
    const block = await setup_1.s.mainnetProvider.send('eth_getBlockByNumber', [
        settlementBlockTag,
        false,
    ]);
    let tx;
    let settlementStateRoot;
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
        tx = await setup_1.s.baseProverContract.proveSettlementLayerState((0, ethers_1.getBytes)((0, ethers_1.hexlify)(rlpEncodedBlockData)));
        await tx.wait();
        console.log('Prove Settlement state tx: ', tx.hash);
        settlementStateRoot = block.stateRoot;
        console.log('Proven settlement state block: ', settlementBlock, settlementBlockTag);
        console.log('Proven settlement state root:', settlementStateRoot);
        return { settlementBlockTag, settlementStateRoot };
    }
    catch (e) {
        if (e.data && setup_1.s.baseProverContract) {
            const decodedError = setup_1.s.baseProverContract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
            console.log(`Error in proveL1WorldState:`, e.shortMessage);
        }
        else {
            console.log(`Error in proveL1WorldState:`, e);
        }
    }
}
async function getFaultDisputeGame(gameType) {
    // Recommend making approximateUnsettledGames configurable and could go as high as 84 but safest is zero.
    console.log('In getFaultDisputeGame');
    const disputeGameFactoryContract = setup_1.s.mainnetSettlementContractOptimism;
    const approximateUnsettledGames = 72n;
    let lastGame = (await disputeGameFactoryContract.gameCount()) -
        1n -
        approximateUnsettledGames;
    // lastGame = 1712n
    console.log('Starting lastGame: ', lastGame);
    while (lastGame > 0) {
        const gameData = await disputeGameFactoryContract.gameAtIndex(lastGame);
        const faultDisputeGameAddress = gameData.proxy_;
        const faultDisputeGameContract = new ethers_1.Contract(faultDisputeGameAddress, FaultDisputeGameArtifact.abi, setup_1.s.mainnetProvider);
        const faultDisputeGameResolvedEvents = await faultDisputeGameContract.queryFilter(faultDisputeGameContract.getEvent('Resolved'));
        if (faultDisputeGameResolvedEvents.length !== 0) {
            console.log('faultDisputeGameAddress: ', faultDisputeGameAddress);
            return { faultDisputeGameAddress, faultDisputeGameContract };
        }
        lastGame -= 1n;
    }
}
async function getGameIndex(disputeGameFactoryContract, faultDisputeGameAddress) {
    console.log('In getGameIndex');
    // Recommend making approximateUnsettledGames configurable and could go as high as 84 but safest is zero.
    const approximateUnsettledGames = 72n;
    // Optionally you could subtract say 50 games from the last game to reduce RPC calls
    //
    let lastGame = (await disputeGameFactoryContract.gameCount()) -
        1n -
        approximateUnsettledGames;
    console.log('Starting lastGame: ', lastGame);
    while (lastGame > 0) {
        const game = await disputeGameFactoryContract.gameAtIndex(lastGame);
        if (game.proxy_ === faultDisputeGameAddress) {
            return lastGame.toString();
        }
        lastGame -= 1n;
    }
}
async function proveWorldStateCannonBaseToOptimism(settlementBlockTag, settlementStateRoot, faultDisputeGameAddress, faultDisputeGameContract) {
    console.log('In proveWorldStateCannonBaseToOptimism');
    // For more information on how DisputeGameFactory utility functions, see the following code
    // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol#L82
    // get the endBatchBlockData
    // Note: For all proofs we use two block numbers
    // For anything related to the settlement chain we use settlementBlockTag
    // For anything related to the destination chain we use endBatchBlockHex
    const disputeGameFactoryContract = setup_1.s.mainnetSettlementContractOptimism;
    // Get the faultDisputeGame game data
    const faultDisputeGameData = await faultDisputeGameContract.gameData();
    const faultDisputeGameCreatedAt = await faultDisputeGameContract.createdAt();
    const faultDisputeGameResolvedAt = await faultDisputeGameContract.resolvedAt();
    const faultDisputeGameGameStatus = await faultDisputeGameContract.status();
    const faultDisputeGameInitialized = true;
    const faultDisputeGameL2BlockNumberChallenged = false;
    const faultDisputeGameL2BlockNumber = await faultDisputeGameContract.l2BlockNumber();
    const endBatchBlockHex = (0, ethers_1.toQuantity)(faultDisputeGameL2BlockNumber);
    const endBatchBlockData = await setup_1.s.optimismProvider.send('eth_getBlockByNumber', [endBatchBlockHex, false]);
    const rlpEncodedEndBatchBlockData = await getOptimismRLPEncodedBlock(endBatchBlockData);
    // Get the Message Parser State Root at the end block of the batch
    const l2MesagePasserProof = await setup_1.s.optimismProvider.send('eth_getProof', [
        config_1.networks.optimism.proving.l2l1MessageParserAddress,
        [],
        endBatchBlockHex,
    ]);
    // Get the DisputeGameFactory data GameId
    const faultDisputeGameId = await setup_1.s.baseProverContract.pack(faultDisputeGameData.gameType_, faultDisputeGameCreatedAt, faultDisputeGameAddress);
    // TODO gameIndex needs to come from above data by looking for matching faultDisputeGame rootClaim and extraData
    const gameIndex = await getGameIndex(disputeGameFactoryContract, faultDisputeGameAddress);
    // disputeGameFactoryStorageSlot is where the gameId is stored
    // In solidity
    // uint256(keccak256(abi.encode(L2_DISPUTE_GAME_FACTORY_LIST_SLOT_NUMBER)))
    //                       + disputeGameFactoryProofData.gameIndex
    const disputeGameFactorySlotNumber = 104;
    const disputeGameFactoryGameIndex = gameIndex;
    const arrayLengthSlot = (0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(disputeGameFactorySlotNumber), 32);
    const firstElementSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes32'], [arrayLengthSlot]);
    const disputeGameFactoryStorageSlot = (0, ethers_1.toBeHex)(BigInt(firstElementSlot) + BigInt(Number(disputeGameFactoryGameIndex)), 32);
    const disputeGameFactoryProof = await setup_1.s.mainnetProvider.send('eth_getProof', [
        config_1.networks.mainnet.settlementContracts.optimism,
        [disputeGameFactoryStorageSlot],
        settlementBlockTag,
    ]);
    const disputeGameFactoryContractData = [
        (0, ethers_1.toBeHex)(disputeGameFactoryProof.nonce), // nonce
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(disputeGameFactoryProof.balance)), // balance
        disputeGameFactoryProof.storageHash, // storageHash
        disputeGameFactoryProof.codeHash, // CodeHash
    ];
    const RLPEncodedDisputeGameFactoryData = await setup_1.s.baseProverContract.rlpEncodeDataLibList(disputeGameFactoryContractData);
    // populate fields for the DisputeGameFactory proof
    const disputeGameFactoryProofData = {
        messagePasserStateRoot: l2MesagePasserProof.storageHash,
        latestBlockHash: endBatchBlockData.hash,
        gameIndex: disputeGameFactoryGameIndex,
        gameId: faultDisputeGameId,
        disputeFaultGameStorageProof: disputeGameFactoryProof.storageProof[0].proof,
        rlpEncodedDisputeGameFactoryData: RLPEncodedDisputeGameFactoryData,
        disputeGameFactoryAccountProof: disputeGameFactoryProof.accountProof,
    };
    // populate fields for the FaultDisputeGame rootclaim proof
    // Storage proof for faultDisputeGame root claim
    // rootClaimSlot - hardcooded value for the slot which is a keecak256 hash  the slot for rootClaim
    const zeroSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes32'], [(0, ethers_1.zeroPadValue)((0, ethers_1.toBeArray)(0), 32)]);
    console.log('zeroSlot: ', zeroSlot);
    const faultDisputeGameRootClaimStorageSlot = '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1';
    console.log('faultDisputeGameAddress: ', faultDisputeGameAddress);
    console.log('settlementBlockTag: ', settlementBlockTag);
    const faultDisputeGameRootClaimProof = await setup_1.s.mainnetProvider.send('eth_getProof', [
        faultDisputeGameAddress,
        [faultDisputeGameRootClaimStorageSlot],
        settlementBlockTag,
    ]);
    // Storage proof for faultDisputeGame resolved
    // rootClaimSlot - hardcoded value for slot zero which is where the status is stored
    const faultDisputeGameResolvedStorageSlot = '0x0000000000000000000000000000000000000000000000000000000000000000';
    // '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1'
    const faultDisputeGameRootResolvedProof = await setup_1.s.mainnetProvider.send('eth_getProof', [
        faultDisputeGameAddress,
        [faultDisputeGameResolvedStorageSlot],
        settlementBlockTag,
    ]);
    const faultDisputeGameContractData = [
        (0, ethers_1.toBeHex)(faultDisputeGameRootClaimProof.nonce), // nonce
        (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(faultDisputeGameRootClaimProof.balance)), // balance
        faultDisputeGameRootClaimProof.storageHash, // storageHash
        faultDisputeGameRootClaimProof.codeHash, // CodeHash
    ];
    const RLPEncodedFaultDisputeGameContractData = await setup_1.s.baseProverContract.rlpEncodeDataLibList(faultDisputeGameContractData);
    const faultDisputeGameProofData = {
        // faultDisputeGameStateRoot: endBatchBlockData.stateRoot,
        faultDisputeGameStateRoot: faultDisputeGameRootClaimProof.storageHash,
        faultDisputeGameRootClaimStorageProof: faultDisputeGameRootClaimProof.storageProof[0].proof,
        faultDisputeGameStatusSlotData: {
            createdAt: faultDisputeGameCreatedAt,
            resolvedAt: faultDisputeGameResolvedAt,
            gameStatus: faultDisputeGameGameStatus,
            initialized: faultDisputeGameInitialized,
            l2BlockNumberChallenged: faultDisputeGameL2BlockNumberChallenged,
        },
        // populate fields for the FaultDisputeGame resolved proof
        faultDisputeGameStatusStorageProof: faultDisputeGameRootResolvedProof.storageProof[0].proof,
        rlpEncodedFaultDisputeGameData: RLPEncodedFaultDisputeGameContractData,
        faultDisputeGameAccountProof: faultDisputeGameRootClaimProof.accountProof,
    };
    try {
        // Note: ProveStorage and ProveAccount are pure functions and included here just for unit testing
        const { gameProxy_ } = await setup_1.s.baseProverContract.unpack(disputeGameFactoryProofData.gameId);
        // proveStorageDisputeGameFactory
        await setup_1.s.baseProverContract.proveStorage(disputeGameFactoryStorageSlot, (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(faultDisputeGameId))), 
        // encodeRlp(cannon.faultDisputeGameRootClaimStorage),
        disputeGameFactoryProof.storageProof[0].proof, disputeGameFactoryProof.storageHash);
        // proveAccountDisputeGameFactory
        await setup_1.s.baseProverContract.proveAccount(config_1.networks.mainnet.settlementContracts.optimism, disputeGameFactoryProofData.rlpEncodedDisputeGameFactoryData, disputeGameFactoryProofData.disputeGameFactoryAccountProof, settlementStateRoot);
        // proveStorageFaultDisputeGameRootClaim
        await setup_1.s.baseProverContract.proveStorage(faultDisputeGameRootClaimStorageSlot, (0, ethers_1.encodeRlp)((0, ethers_1.toBeHex)((0, ethers_1.stripZerosLeft)(faultDisputeGameData.rootClaim_))), 
        // encodeRlp(cannon.faultDisputeGameRootClaimStorage),
        faultDisputeGameRootClaimProof.storageProof[0].proof, faultDisputeGameRootClaimProof.storageHash);
        // proveStorageFaultDisputeGameResolved
        await setup_1.s.baseProverContract.proveStorage(faultDisputeGameResolvedStorageSlot, await setup_1.s.baseProverContract.assembleGameStatusStorage(faultDisputeGameCreatedAt, faultDisputeGameResolvedAt, faultDisputeGameGameStatus, faultDisputeGameInitialized, faultDisputeGameL2BlockNumberChallenged), faultDisputeGameRootResolvedProof.storageProof[0].proof, faultDisputeGameRootResolvedProof.storageHash);
        // proveAccountFaultDisputeGame
        await setup_1.s.baseProverContract.proveAccount(
        // faultDisputeGameAddress,
        // '0x4D664dd0f78673034b29E4A51177333D1131Ac44',
        gameProxy_, faultDisputeGameProofData.rlpEncodedFaultDisputeGameData, faultDisputeGameProofData.faultDisputeGameAccountProof, settlementStateRoot);
        // console.log('proveWorldStateCannon')
        const proveWorldStateCannonTx = await setup_1.s.baseProverContract.proveWorldStateCannon(config_1.networkIds.optimism, rlpEncodedEndBatchBlockData, endBatchBlockData.stateRoot, disputeGameFactoryProofData, faultDisputeGameProofData, settlementStateRoot);
        await proveWorldStateCannonTx.wait();
        console.log('ProvenWorldStateCannon Base to Optimism');
        return endBatchBlockData;
    }
    catch (e) {
        if (e.data && setup_1.s.baseProverContract) {
            const decodedError = setup_1.s.baseProverContract.interface.parseError(e.data);
            console.log(`Transaction failed: ${decodedError?.name}`);
            console.log(`Error in ProveWorldStateCannon:`, e.shortMessage);
        }
        else {
            console.log(`Error in ProvenWorldStateCannon:`, e);
        }
    }
}
async function proveIntent(intentHash, endBatchBlockData) {
    console.log('In proveIntent');
    const inboxStorageSlot = (0, ethers_1.solidityPackedKeccak256)(['bytes'], [setup_1.s.abiCoder.encode(['bytes32', 'uint256'], [intentHash, 1])]);
    console.log('networks.optimism.inboxAddress: ', config_1.networks.optimism.inboxAddress);
    console.log('inboxStorageSlot: ', inboxStorageSlot);
    console.log('endBatchBlockData.number: ', endBatchBlockData.number);
    const intentInboxProof = await setup_1.s.optimismProvider.send('eth_getProof', [
        config_1.networks.optimism.inboxAddress,
        [inboxStorageSlot],
        endBatchBlockData.number,
    ]);
    const intentInfo = await setup_1.s.baseIntentSourceContractClaimant.getIntent(intentHash);
    const abiCoder = ethers_1.AbiCoder.defaultAbiCoder();
    const intermediateHash = (0, ethers_1.keccak256)(abiCoder.encode(['uint256', 'uint256', 'address[]', 'bytes[]', 'uint256', 'bytes32'], [
        config_1.networkIds.base, // sourceChainID
        intentInfo[1], // destinationChainID
        intentInfo[2], // targetTokens
        intentInfo[3], // callData
        intentInfo[6], // expiryTime
        (0, ethers_1.getBytes)(intentInfo[8]), // nonce),
    ]));
    try {
        console.log('Proving Intent');
        console.log('networkIds.optimism: ', config_1.networkIds.optimism);
        console.log('actors.claimant: ', config_1.actors.claimant);
        console.log('networks.optimism.inboxAddress: ', config_1.networks.optimism.inboxAddress);
        console.log('intermediateHash: ', intermediateHash);
        console.log('intentInboxProof.storageProof[0].proof: ', intentInboxProof.storageProof[0].proof);
        console.log('baseProverContract.rlpEncodeDataLibList: ', await setup_1.s.baseProverContract.rlpEncodeDataLibList([
            (0, ethers_1.toBeHex)(intentInboxProof.nonce), // nonce
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(intentInboxProof.balance)),
            intentInboxProof.storageHash,
            intentInboxProof.codeHash,
        ]));
        console.log('endBatchBlockData.stateRoot: ', endBatchBlockData.stateRoot);
        const proveIntentTx = await setup_1.s.baseProverContract.proveIntent(config_1.networkIds.optimism, config_1.actors.claimant, config_1.networks.optimism.inboxAddress, intermediateHash, intentInboxProof.storageProof[0].proof, await setup_1.s.baseProverContract.rlpEncodeDataLibList([
            (0, ethers_1.toBeHex)(intentInboxProof.nonce), // nonce
            (0, ethers_1.stripZerosLeft)((0, ethers_1.toBeHex)(intentInboxProof.balance)),
            intentInboxProof.storageHash,
            intentInboxProof.codeHash,
        ]), intentInboxProof.accountProof, endBatchBlockData.stateRoot);
        await proveIntentTx.wait();
        console.log('Prove Intent tx:', proveIntentTx.hash);
        return proveIntentTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.baseProverContract) {
            const decodedError = setup_1.s.baseProverContract.interface.parseError(e.data);
            console.log(`Transaction failed in proveIntent : ${decodedError?.name}`);
            console.log('proveIntent decodedError: ', decodedError);
        }
        else {
            console.log(`Error in proveIntent:`, e);
        }
    }
}
async function withdrawReward(intentHash) {
    console.log('In withdrawReward');
    try {
        const withdrawTx = await setup_1.s.baseIntentSourceContractClaimant.withdrawRewards(intentHash);
        await withdrawTx.wait();
        console.log('Withdrawal tx: ', withdrawTx.hash);
        return withdrawTx.hash;
    }
    catch (e) {
        if (e.data && setup_1.s.baseIntentSourceContractClaimant) {
            const decodedError = setup_1.s.baseIntentSourceContractClaimant.interface.parseError(e.data);
            console.log(`Transaction failed in withdrawReward : ${decodedError?.name}`);
        }
        else {
            console.log(`Error in withdrawReward:`, e);
        }
    }
}
async function main() {
    let intentHash, intentFulfillTransaction;
    try {
        console.log('In intentWithdrawBaseOp');
        intentHash = config_1.intent.baseOpCannon.hash;
        intentFulfillTransaction = config_1.intent.baseOpCannon.fulfillTransaction;
        console.log('intentHash: ', intentHash);
        console.log('intentFulfillTransaction: ', intentFulfillTransaction);
        const { settlementBlockTag, settlementStateRoot } = await proveSettlementLayerState();
        console.log('settlementBlockTag: ', settlementBlockTag);
        console.log('settlementStateRoot: ', settlementStateRoot);
        // await getLatestResolvedFaultDisputeGame()
        // const { faultDisputeGameAddress, faultDisputeGameContract } =
        // await getFaultDisputeGameOriginal()
        const gameType = 1; // 1 is the gameType for Optimism Cannon gameType
        const { faultDisputeGameAddress, faultDisputeGameContract } = await getFaultDisputeGame(gameType);
        console.log('Main faultDisputeGameAddress: ', faultDisputeGameAddress);
        const endBatchBlockData = await proveWorldStateCannonBaseToOptimism(settlementBlockTag, settlementStateRoot, faultDisputeGameAddress, faultDisputeGameContract);
        await proveIntent(intentHash, endBatchBlockData);
        await withdrawReward(intentHash);
        console.log('End of Main');
    }
    catch (e) {
        console.log(e);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
