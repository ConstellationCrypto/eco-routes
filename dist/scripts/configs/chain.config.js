"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainnetChainConfigs = exports.SepoliaChainConfigs = void 0;
const mainnet_config_1 = require("./mainnet.config");
const sepolia_config_1 = require("./sepolia.config");
exports.SepoliaChainConfigs = {
    baseSepoliaChainConfiguration: sepolia_config_1.baseSepoliaChainConfiguration,
    optimismSepoliaChainConfiguration: sepolia_config_1.optimismSepoliaChainConfiguration,
    // ecoTestnetChainConfiguration,
    arbitrumSepoliaChainConfiguration: sepolia_config_1.arbitrumSepoliaChainConfiguration,
    mantleSepoliaChainConfiguration: sepolia_config_1.mantleSepoliaChainConfiguration,
    curtisTestnetChainConfiguration: sepolia_config_1.curtisTestnetChainConfiguration,
    mantaSepoliaChainConfiguration: sepolia_config_1.mantaSepoliaChainConfiguration
};
exports.MainnetChainConfigs = {
    baseChainConfiguration: mainnet_config_1.baseChainConfiguration,
    optimismChainConfiguration: mainnet_config_1.optimismChainConfiguration,
    // helixChainConfiguration,
    arbitrumChainConfiguration: mainnet_config_1.arbitrumChainConfiguration,
    mantleChainConfiguration: mainnet_config_1.mantleChainConfiguration,
    curtisTestnetChainConfiguration: sepolia_config_1.curtisTestnetChainConfiguration,
};
