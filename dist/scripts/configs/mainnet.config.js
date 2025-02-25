"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantleChainConfiguration = exports.arbitrumChainConfiguration = exports.helixChainConfiguration = exports.optimismChainConfiguration = exports.baseChainConfiguration = void 0;
const config_1 = require("../../config/mainnet/config");
exports.baseChainConfiguration = {
    chainId: config_1.networks.base.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.base.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.base.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.base.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.base.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.base.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.optimismChainConfiguration = {
    chainId: config_1.networks.optimism.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.optimism.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.optimism.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.optimism.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.     blockhashOracle: networks.optimism.proving.l1BlockAddress,
        blockhashOracle: config_1.networks.optimism.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.optimism.proving.outputRootVersionNumber,
        finalityDelaySeconds: 0,
    },
};
exports.helixChainConfiguration = {
    chainId: config_1.networks.helix.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.helix.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.helix.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.helix.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.helix.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.helix.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.arbitrumChainConfiguration = {
    chainId: config_1.networks.arbitrum.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.arbitrum.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.arbitrum.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.arbitrum.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.arbitrum.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.arbitrum.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 0,
    },
};
exports.mantleChainConfiguration = {
    chainId: config_1.networks.mantle.chainId, // chainId
    chainConfiguration: {
        provingMechanism: config_1.networks.mantle.proving.mechanism, // provingMechanism
        settlementChainId: config_1.networks.mantle.proving.settlementChain.id, // settlementChainId
        settlementContract: config_1.networks.mantle.proving.settlementChain.contract, // settlementContract e.g DisputGameFactory or L2OutputOracle.
        blockhashOracle: config_1.networks.mantle.proving.l1BlockAddress, // blockhashOracle
        outputRootVersionNumber: config_1.networks.mantle.proving.outputRootVersionNumber, // outputRootVersionNumber
        finalityDelaySeconds: 604800,
    },
};
