"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployChains = exports.sepoliaDep = exports.mainnetDep = void 0;
const aa_core_1 = require("@alchemy/aa-core");
const chains_1 = require("viem/chains");
// Mainnet chains
exports.mainnetDep = [
    aa_core_1.arbitrum,
    aa_core_1.base,
    chains_1.mantle,
    aa_core_1.optimism,
    chains_1.polygon,
    chains_1.mainnet,
    // abstract,
];
// Test chains
exports.sepoliaDep = [
    // problamatic
    // arbitrumSepolia,
    // mantleSepoliaTestnet,
    // abstractTestnet,
    // working
    aa_core_1.baseSepolia,
    aa_core_1.optimismSepolia,
    chains_1.sepolia,
];
/**
 * The chains to deploy from {@link ProtocolDeploy}
 * Deployer 0xB963326B9969f841361E6B6605d7304f40f6b414
 */
// export const DeployChains = [mainnetDep].flat() as Chain[]
exports.DeployChains = [exports.sepoliaDep, exports.mainnetDep].flat();
