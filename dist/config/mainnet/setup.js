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
const config_1 = require("../../config/mainnet/config");
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
    // mainnet
    // Providers
    s.mainnetProvider = new ethers_1.AlchemyProvider(config_1.networks.mainnet.network, s.ALCHEMY_API_KEY);
    // Signers
    s.mainnetDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.mainnetProvider);
    s.mainnetIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.mainnetProvider);
    s.mainnetSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.mainnetProvider);
    s.mainnetIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.mainnetProvider);
    s.mainnetClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.mainnetProvider);
    // Contracts
    // Note: we use providers for all System Contracts and Signers for Intent Protocol Contracts
    // Settlement Contracts for other Chains
    s.mainnetSettlementContractBase = new ethers_1.Contract(config_1.networks.mainnet.settlementContracts.base, L2OutputArtifact.abi, s.mainnetProvider);
    s.mainnetSettlementContractOptimism = new ethers_1.Contract(config_1.networks.mainnet.settlementContracts.optimism, DisputeGameFactoryArtifact.abi, s.mainnetProvider);
    // System Proving Contracts
    // ECO PROTOCOL Contracts
    // Opstimismmainnet
    // Providers
    s.optimismProvider = new ethers_1.AlchemyProvider(config_1.networks.optimism.network, s.ALCHEMY_API_KEY);
    // Signers
    s.optimismDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.optimismProvider);
    s.optimismIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.optimismProvider);
    s.optimismSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.optimismProvider);
    s.optimismIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.optimismProvider);
    s.optimismClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.optimismProvider);
    // Contracts
    // Settlement Contracts for other Chains
    // System Proving Contracts
    s.optimisml1Block = new ethers_1.Contract(config_1.networks.optimism.proving.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.optimismProvider);
    s.optimimsmmainnetL2L1MessageParserContract = new ethers_1.Contract(config_1.networks.optimism.proving.l2l1MessageParserAddress, L2ToL1MessagePasserArtifact.abi, s.optimismProvider);
    // ECO PROTOCOL Contracts
    s.optimismIntentSourceContractIntentCreator = new ethers_1.Contract(config_1.networks.optimism.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.optimismIntentCreator);
    s.optimismIntentSourceContractClaimant = new ethers_1.Contract(config_1.networks.optimism.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.optimismClaimant);
    s.optimismProverContract = new ethers_1.Contract(config_1.networks.optimism.proverContractAddress, typechain_types_1.Prover__factory.abi, s.optimismIntentProver);
    s.optimismInboxContractSolver = new ethers_1.Contract(config_1.networks.optimism.inboxAddress, typechain_types_1.Inbox__factory.abi, s.optimismSolver);
    s.optimismUSDCContractIntentCreator = new ethers_1.Contract(config_1.networks.optimism.usdcAddress, typechain_types_1.ERC20__factory.abi, s.optimismIntentCreator);
    s.optimismUSDCContractSolver = new ethers_1.Contract(config_1.networks.optimism.usdcAddress, typechain_types_1.ERC20__factory.abi, s.optimismSolver);
    // base
    // Providers
    s.baseProvider = new ethers_1.AlchemyProvider(config_1.networks.base.network, s.ALCHEMY_API_KEY);
    // Signers
    s.baseDeployer = new ethers_1.Wallet(s.DEPLOYER_PRIVATE_KEY, s.baseProvider);
    s.baseIntentCreator = new ethers_1.Wallet(s.INTENT_CREATOR_PRIVATE_KEY, s.baseProvider);
    s.baseSolver = new ethers_1.Wallet(s.SOLVER_PRIVATE_KEY, s.baseProvider);
    s.baseIntentProver = new ethers_1.Wallet(s.PROVER_PRIVATE_KEY, s.baseProvider);
    s.baseClaimant = new ethers_1.Wallet(s.CLAIMANT_PRIVATE_KEY, s.baseProvider);
    // System Proving Contracts
    s.basel1Block = new ethers_1.Contract(config_1.networks.base.proving.l1BlockAddress, typechain_types_1.IL1Block__factory.abi, s.baseProvider);
    s.baseL2L1MessageParserContract = new ethers_1.Contract(config_1.networks.base.proving.l2l1MessageParserAddress, L2ToL1MessagePasserArtifact.abi, s.baseProvider);
    // ECO PROTOCOL Contracts
    s.baseIntentSourceContractIntentCreator = new ethers_1.Contract(config_1.networks.base.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.baseIntentCreator);
    s.baseIntentSourceContractClaimant = new ethers_1.Contract(config_1.networks.base.intentSourceAddress, typechain_types_1.IntentSource__factory.abi, s.baseClaimant);
    s.baseProverContract = new ethers_1.Contract(config_1.networks.base.proverContractAddress, typechain_types_1.Prover__factory.abi, s.baseIntentProver);
    s.baseInboxContractSolver = new ethers_1.Contract(config_1.networks.base.inboxAddress, typechain_types_1.Inbox__factory.abi, s.baseSolver);
    s.baseUSDCContractIntentCreator = new ethers_1.Contract(config_1.networks.base.usdcAddress, typechain_types_1.ERC20__factory.abi, s.baseIntentCreator);
    s.baseUSDCContractSolver = new ethers_1.Contract(config_1.networks.base.usdcAddress, typechain_types_1.ERC20__factory.abi, s.baseSolver);
})(s || (exports.s = s = {}));
