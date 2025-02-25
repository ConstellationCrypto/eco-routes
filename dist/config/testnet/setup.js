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
exports.s = void 0;
const ethers_1 = require("ethers");
const typechain_types_1 = require("../../typechain-types");
const config_1 = require("../../config/testnet/config");
const L2OutputArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/L2OutputOracle.sol/L2OutputOracle.json"));
const DisputeGameFactoryArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/DisputeGameFactory.sol/DisputeGameFactory.json"));
const L2ToL1MessagePasserArtifact = __importStar(require("@eth-optimism/contracts-bedrock/forge-artifacts/L2ToL1MessagePasser.sol/L2ToL1MessagePasser.json"));
var s;
(function (s) {
    // default AbiCoder
    s.abiCoder = ethers_1.AbiCoder.defaultAbiCoder();
    // Private Keys
    s.DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '';
    s.INTENT_CREATOR_PRIVATE_KEY = process.env.INTENT_CREATOR_PRIVATE_KEY || '';
    s.SOLVER_PRIVATE_KEY = process.env.SOLVER_PRIVATE_KEY || '';
    s.CLAIMANT_PRIVATE_KEY = process.env.CLAIMANT_PRIVATE_KEY || '';
    s.PROVER_PRIVATE_KEY = process.env.PROVER_PRIVATE_KEY || '';
    s.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
    // The following setup is Per Chain
    // Sepolia
    // Providers
    s.sepoliaProvider = new ethers_1.AlchemyProvider(config_1.networks.sepolia.network, s.ALCHEMY_API_KEY);
    // Signers
    s.sepoliaDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.sepoliaProvider);
    s.sepoliaIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.sepoliaProvider);
    s.sepoliaSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.sepoliaProvider);
    s.sepoliaIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.sepoliaProvider);
    s.sepoliaClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.sepoliaProvider);
    // Contracts
    // Note: we use providers for all System Contracts and Signers for Intent Protocol Contracts
    // Settlement Contracts for other Chains
    s.sepoliaSettlementContractBase = new ethers_1.Contract(config_1.networks.sepolia.settlementContracts.baseSepolia, DisputeGameFactoryArtifact.abi, s.sepoliaProvider);
    s.sepoliaSettlementContractOptimism = new ethers_1.Contract(config_1.networks.sepolia.settlementContracts.optimismSepolia, DisputeGameFactoryArtifact.abi, s.sepoliaProvider);
    // System Proving Contracts
    // ECO PROTOCOL Contracts
    // OpstimismSepolia
    // Providers
    s.optimismSepoliaProvider = new ethers_1.AlchemyProvider(config_1.networks.optimismSepolia.network, s.ALCHEMY_API_KEY);
    // Signers
    s.optimismSepoliaDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.optimismSepoliaProvider);
    s.optimismSepoliaIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.optimismSepoliaProvider);
    s.optimismSepoliaSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.optimismSepoliaProvider);
    s.optimismSepoliaIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.optimismSepoliaProvider);
    s.optimismSepoliaClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.optimismSepoliaProvider);
    // Contracts
    // Settlement Contracts for other Chains
    // System Proving Contracts
    s.optimismSepolial1Block = new ethers_1.Contract(config_1.networks.optimismSepolia.proving.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.optimismSepoliaProvider);
    s.optimimsmSepoliaL2L1MessageParserContract = new ethers_1.Contract(config_1.networks.optimismSepolia.proving.l2l1MessageParserAddress, L2ToL1MessagePasserArtifact.abi, s.optimismSepoliaProvider);
    // ECO PROTOCOL Contracts
    s.optimismSepoliaIntentSourceContractIntentCreator = new ethers_1.Contract(config_1.networks.optimismSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.optimismSepoliaIntentCreator);
    s.optimismSepoliaIntentSourceContractClaimant = new ethers_1.Contract(config_1.networks.optimismSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.optimismSepoliaClaimant);
    s.optimismSepoliaProverContract = new ethers_1.Contract(config_1.networks.optimismSepolia.proverContractAddress, typechain_types_1.Prover__factory.abi, s.optimismSepoliaIntentProver);
    s.optimismSepoliaInboxContractSolver = new ethers_1.Contract(config_1.networks.optimismSepolia.inboxAddress, typechain_types_1.Inbox__factory.abi, s.optimismSepoliaSolver);
    s.optimismSepoliaUSDCContractIntentCreator = new ethers_1.Contract(config_1.networks.optimismSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.optimismSepoliaIntentCreator);
    s.optimismSepoliaUSDCContractSolver = new ethers_1.Contract(config_1.networks.optimismSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.optimismSepoliaSolver);
    // BaseSepolia
    // Providers
    s.baseSepoliaProvider = new ethers_1.AlchemyProvider(config_1.networks.baseSepolia.network, s.ALCHEMY_API_KEY);
    // Signers
    s.baseSepoliaDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.baseSepoliaProvider);
    s.baseSepoliaIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.baseSepoliaProvider);
    s.baseSepoliaSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.baseSepoliaProvider);
    s.baseSepoliaIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.baseSepoliaProvider);
    s.baseSepoliaClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.baseSepoliaProvider);
    // Contracts
    // Settlement Contracts for other Chains
    s.baseSepoliaSettlementContractEcoTestNet = new ethers_1.Contract(config_1.networks.baseSepolia.settlementContracts.ecoTestnet, L2OutputArtifact.abi, s.baseSepoliaProvider);
    // System Proving Contracts
    s.baseSepolial1Block = new ethers_1.Contract(config_1.networks.baseSepolia.proving.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.baseSepoliaProvider);
    s.baseSepoliaL2L1MessageParserContract = new ethers_1.Contract(config_1.networks.baseSepolia.proving.l2l1MessageParserAddress, L2ToL1MessagePasserArtifact.abi, s.baseSepoliaProvider);
    // ECO PROTOCOL Contracts
    s.baseSepoliaIntentSourceContractIntentCreator = new ethers_1.Contract(config_1.networks.baseSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.baseSepoliaIntentCreator);
    s.baseSepoliaIntentSourceContractClaimant = new ethers_1.Contract(config_1.networks.baseSepolia.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.baseSepoliaClaimant);
    s.baseSepoliaProverContract = new ethers_1.Contract(config_1.networks.baseSepolia.proverContractAddress, typechain_types_1.Prover__factory.abi, s.baseSepoliaIntentProver);
    s.baseSepoliaInboxContractSolver = new ethers_1.Contract(config_1.networks.baseSepolia.inboxAddress, typechain_types_1.Inbox__factory.abi, s.baseSepoliaSolver);
    s.baseSepoliaUSDCContractIntentCreator = new ethers_1.Contract(config_1.networks.baseSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.baseSepoliaIntentCreator);
    s.baseSepoliaUSDCContractSolver = new ethers_1.Contract(config_1.networks.baseSepolia.usdcAddress, typechain_types_1.ERC20__factory.abi, s.baseSepoliaSolver);
    // EcoTestNet
    // Providers
    s.ecoTestnetProvider = (0, ethers_1.getDefaultProvider)(config_1.networks.ecoTestnet.rpcUrl);
    // Signers
    s.ecoTestnetDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.ecoTestnetProvider);
    s.ecoTestnetIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.ecoTestnetProvider);
    s.ecoTestnetSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.ecoTestnetProvider);
    s.ecoTestnetIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.ecoTestnetProvider);
    s.ecoTestnetClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.ecoTestnetProvider);
    // Contracts
    // Settlement Contracts for other Chains
    // System Proving Contracts
    s.ecoTestnetl1Block = new ethers_1.Contract(config_1.networks.ecoTestnet.proving.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.ecoTestnetProvider);
    s.ecoTestnetL2L1MessageParserContract = new ethers_1.Contract(config_1.networks.ecoTestnet.proving.l2l1MessageParserAddress, L2ToL1MessagePasserArtifact.abi, s.ecoTestnetProvider);
    // ECO PROTOCOL Contracts
    s.ecoTestnetIntentSourceContractIntentCreator = new ethers_1.Contract(config_1.networks.ecoTestnet.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.ecoTestnetIntentCreator);
    s.ecoTestnetIntentSourceContractClaimant = new ethers_1.Contract(config_1.networks.ecoTestnet.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.ecoTestnetClaimant);
    //   export const ecoTestnetProverContract = new Contract(
    //     networks.ecoTestnet.proverContractAddress,
    //     ProverL3__factory.abi,
    //     ecoTestnetDeployer, // Use deployer as prover as we need to do privileged operations
    //   )
    s.ecoTestnetInboxContractSolver = new ethers_1.Contract(config_1.networks.ecoTestnet.inboxAddress, typechain_types_1.Inbox__factory.abi, s.ecoTestnetSolver);
    s.ecoTestnetUSDCContractIntentCreator = new ethers_1.Contract(config_1.networks.ecoTestnet.usdcAddress, typechain_types_1.ERC20__factory.abi, s.ecoTestnetIntentCreator);
    s.ecoTestnetUSDCContractSolver = new ethers_1.Contract(config_1.networks.ecoTestnet.usdcAddress, typechain_types_1.ERC20__factory.abi, s.ecoTestnetSolver);
})(s || (exports.s = s = {}));
