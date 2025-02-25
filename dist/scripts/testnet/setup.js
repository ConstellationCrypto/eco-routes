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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = void 0;
const config_1 = __importDefault(require("../../config/testnet/config"));
const ethers_1 = require("ethers");
const typechain_types_1 = require("../../typechain-types");
const L2OutputArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/L2OutputOracle.sol/L2OutputOracle.json"));
const DisputeGameFactoryArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/DisputeGameFactory.sol/DisputeGameFactory.json"));
const L2ToL1MessagePasser = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/L2ToL1MessagePasser.sol/L2ToL1MessagePasser.json"));
var s;
(function (s) {
    // default AbiCoder
    s.abiCoder = ethers_1.AbiCoder.defaultAbiCoder();
    // Private Keys
    s.DEPLOYER_PRIVATE_KEY = process.env.DEPLOY_PRIVATE_KEY || '';
    s.INTENT_CREATOR_PRIVATE_KEY = process.env.INTENT_CREATOR_PRIVATE_KEY || '';
    s.SOLVER_PRIVATE_KEY = process.env.SOLVER_PRIVATE_KEY || '';
    s.CLAIMANT_PRIVATE_KEY = process.env.CLAIMANT_PRIVATE_KEY || '';
    s.PROVER_PRIVATE_KEY = process.env.PROVER_PRIVATE_KEY || '';
    s.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
    // Providers
    s.layer1Provider = new ethers_1.AlchemyProvider(config_1.default.sepolia.network, s.ALCHEMY_API_KEY);
    s.layer2SourceProvider = new ethers_1.AlchemyProvider(config_1.default.baseSepolia.network, s.ALCHEMY_API_KEY);
    s.layer2DestinationProvider = new ethers_1.AlchemyProvider(config_1.default.optimismSepolia.network, s.ALCHEMY_API_KEY);
    // Signers
    // Layer2 Source
    s.layer2SourceIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.layer2SourceProvider);
    s.layer2SourceIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.layer2SourceProvider);
    s.layer2SourceSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.layer2SourceProvider);
    s.layer2SourceClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.layer2SourceProvider);
    // Layer2 Destination
    s.layer2DestinationSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.layer2DestinationProvider);
    s.layer2DestinationProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.layer2DestinationProvider);
    // Contracts
    // Note: we use providers for all System Contracts and Signers for Intent Protocol Contracts
    // Layer 1 Sepolia
    s.layer1Layer2DestinationOutputOracleContract = new ethers_1.Contract(config_1.default.sepolia.l2BaseOutputOracleAddress, L2OutputArtifact.abi, s.layer1Provider);
    s.layer1Layer2DisputeGameFactory = new ethers_1.Contract(config_1.default.sepolia.l2OptimismDisputeGameFactory, DisputeGameFactoryArtifact.abi, s.layer1Provider);
    // Layer 2 Source Base Sepolia
    s.layer2Layer1BlockAddressContract = new ethers_1.Contract(config_1.default.baseSepolia.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.layer2SourceProvider);
    s.layer2SourceIntentSourceContract = new ethers_1.Contract(config_1.default.baseSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.layer2SourceIntentCreator);
    s.layer2SourceIntentSourceContractClaimant = new ethers_1.Contract(config_1.default.baseSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.layer2SourceClaimant);
    s.layer2SourceProverContract = new ethers_1.Contract(config_1.default.baseSepolia.proverContractAddress, typechain_types_1.Prover__factory.abi, s.layer2SourceIntentProver);
    s.layer2SourceUSDCContract = new ethers_1.Contract(config_1.default.baseSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.layer2SourceIntentCreator);
    // Layer 2 Destination Optimism Sepolia
    s.layer2DestinationInboxContract = new ethers_1.Contract(config_1.default.optimismSepolia.inboxAddress, typechain_types_1.Inbox__factory.abi, s.layer2DestinationSolver);
    s.Layer2DestinationMessagePasserContract = new ethers_1.Contract(config_1.default.optimismSepolia.l2l1MessageParserAddress, L2ToL1MessagePasser.abi, s.layer2DestinationProvider);
    s.layer2DestinationUSDCContract = new ethers_1.Contract(config_1.default.optimismSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.layer2DestinationSolver);
    // const rewardToken: ERC20 = ERC20__factory.connect(rewardTokens[0], creator)
    // Intent Parameters to baseSepolia
    s.intentCreator = config_1.default.intents.optimismSepolia.creator;
    s.intentSourceAddress = config_1.default.baseSepolia.intentSourceAddress;
    s.intentRewardAmounts = config_1.default.intents.optimismSepolia.rewardAmounts;
    s.intentRewardTokens = config_1.default.intents.optimismSepolia.rewardTokens;
    s.intentDestinationChainId = config_1.default.intents.optimismSepolia.destinationChainId;
    s.intentTargetTokens = config_1.default.intents.optimismSepolia.targetTokens;
    s.intentTargetAmounts = config_1.default.intents.optimismSepolia.targetAmounts;
    s.intentRecipient = config_1.default.intents.optimismSepolia.recipient;
    s.intentDuration = config_1.default.intents.optimismSepolia.duration;
})(s || (exports.s = s = {}));
