"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const deloyProtocol_1 = require("../deloyProtocol");
const config_1 = require("../../config/mainnet/config");
const chain_config_1 = require("../configs/chain.config");
const utils_1 = require("../utils");
const protocolDeploy = (0, deloyProtocol_1.getEmptyProtocolDeploy)();
(0, deloyProtocol_1.deployProtocol)(protocolDeploy, (0, utils_1.getDeployNetwork)(hardhat_1.network.name), config_1.actors.solver, [
    chain_config_1.MainnetChainConfigs.baseChainConfiguration,
    chain_config_1.MainnetChainConfigs.optimismChainConfiguration,
    // MainnetChainConfigs.helixChainConfiguration,
    chain_config_1.MainnetChainConfigs.arbitrumChainConfiguration,
    chain_config_1.MainnetChainConfigs.mantleChainConfiguration,
], { isSolvingPublic: true, deployPre: true }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
