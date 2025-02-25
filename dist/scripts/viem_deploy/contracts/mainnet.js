"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IntentSource_json_1 = __importDefault(require("../../../artifacts/contracts/IntentSource.sol/IntentSource.json"));
const Inbox_json_1 = __importDefault(require("../../../artifacts/contracts/Inbox.sol/Inbox.json"));
const HyperProver_json_1 = __importDefault(require("../../../artifacts/contracts/prover/HyperProver.sol/HyperProver.json"));
const MainnetContracts = {
    // Prover: {
    //   name: Prover.contractName,
    //   path: 'contracts/prover',
    //   abi: Prover.abi,
    //   bytecode: Prover.bytecode as Hex,
    //   args: [
    //     5,
    //     [
    //       MainnetChainConfigs.baseChainConfiguration,
    //       MainnetChainConfigs.optimismChainConfiguration,
    //       MainnetChainConfigs.arbitrumChainConfiguration,
    //       MainnetChainConfigs.mantleChainConfiguration,
    //     ],
    //   ],
    // },
    IntentSource: {
        name: IntentSource_json_1.default.contractName,
        path: 'contracts',
        abi: IntentSource_json_1.default.abi,
        bytecode: IntentSource_json_1.default.bytecode,
        args: [],
    },
    Inbox: {
        name: Inbox_json_1.default.contractName,
        path: 'contracts',
        abi: Inbox_json_1.default.abi,
        bytecode: Inbox_json_1.default.bytecode,
        args: [],
    },
    HyperProver: {
        name: HyperProver_json_1.default.contractName,
        path: 'contracts/prover',
        abi: HyperProver_json_1.default.abi,
        bytecode: HyperProver_json_1.default.bytecode,
        args: [],
    },
};
exports.default = MainnetContracts;
