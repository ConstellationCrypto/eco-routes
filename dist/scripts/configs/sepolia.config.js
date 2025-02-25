"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantaSepoliaChainConfiguration = exports.curtisTestnetChainConfiguration = exports.arbitrumSepoliaChainConfiguration = exports.mantleSepoliaChainConfiguration = exports.ecoTestnetChainConfiguration = exports.optimismSepoliaChainConfiguration = exports.baseSepoliaChainConfiguration = void 0;
const config_1 = require("../../config/testnet/config");
exports.baseSepoliaChainConfiguration = {
    chainId: config_1.networks.baseSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.baseSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.baseSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.baseSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.baseSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.baseSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.optimismSepoliaChainConfiguration = {
    chainId: config_1.networks.optimismSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.optimismSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.optimismSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.optimismSepolia.proving.settlementChain.contract, // settlementContract e.g DisputeGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.optimismSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.optimismSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.ecoTestnetChainConfiguration = {
    chainId: config_1.networks.ecoTestnet.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.ecoTestnet.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.ecoTestnet.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.ecoTestnet.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.ecoTestnet.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.ecoTestnet.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.mantleSepoliaChainConfiguration = {
    chainId: config_1.networks.mantleSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.mantleSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.mantleSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.mantleSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.mantleSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.mantleSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 604800,
    },
};
exports.arbitrumSepoliaChainConfiguration = {
    chainId: config_1.networks.arbitrumSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.arbitrumSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.arbitrumSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.arbitrumSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.arbitrumSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.arbitrumSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.curtisTestnetChainConfiguration = {
    chainId: config_1.networks.curtisTestnet.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.curtisTestnet.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.curtisTestnet.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.curtisTestnet.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.curtisTestnet.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.curtisTestnet.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.mantaSepoliaChainConfiguration = {
    chainId: config_1.networks.mantaSepolia.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.mantaSepolia.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.mantaSepolia.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.mantaSepolia.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.mantaSepolia.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.mantaSepolia.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
