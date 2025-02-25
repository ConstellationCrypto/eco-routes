"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mainnet_1 = __importDefault(require("./mainnet"));
const SepoliaContracts = {
    ...mainnet_1.default,
    // Prover: {
    //   ...MainnetContracts.Prover,
    //   args: [
    //     5,
    //     [
    //       SepoliaChainConfigs.baseSepoliaChainConfiguration,
    //       SepoliaChainConfigs.optimismSepoliaChainConfiguration,
    //       SepoliaChainConfigs.arbitrumSepoliaChainConfiguration,
    //       SepoliaChainConfigs.mantleSepoliaChainConfiguration,
    //     ],
    //   ],
    // },
};
exports.default = SepoliaContracts;
