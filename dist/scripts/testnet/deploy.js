"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCHEMY_API_KEY = void 0;
const hardhat_1 = require("hardhat");
const config_1 = require("../../config/testnet/config");
const deloyProtocol_1 = require("../deloyProtocol");
const chain_config_1 = require("../configs/chain.config");
const utils_1 = require("../utils");
exports.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const protocolDeploy = (0, deloyProtocol_1.getEmptyProtocolDeploy)();
(0, deloyProtocol_1.deployProtocol)(protocolDeploy, (0, utils_1.getDeployNetwork)(hardhat_1.network.name), config_1.actors.solver, [
    chain_config_1.SepoliaChainConfigs.baseSepoliaChainConfiguration,
    chain_config_1.SepoliaChainConfigs.optimismSepoliaChainConfiguration,
    // ecoTestnetChainConfiguration,
    chain_config_1.SepoliaChainConfigs.arbitrumSepoliaChainConfiguration,
    chain_config_1.SepoliaChainConfigs.mantleSepoliaChainConfiguration,
    chain_config_1.SepoliaChainConfigs.curtisTestnetChainConfiguration,
    chain_config_1.SepoliaChainConfigs.mantaSepoliaChainConfiguration,
], { isSolvingPublic: true, deployPre: true }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
