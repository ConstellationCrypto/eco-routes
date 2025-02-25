"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create3Deployer = exports.Create2Deployer = exports.CREATE3_DEPLOYER_ADDRESS = exports.CREATE2_DEPLOYER_ADDRESS = void 0;
const Create2Deployer_json_1 = __importDefault(require("@axelar-network/axelar-gmp-sdk-solidity/artifacts/contracts/deploy/Create2Deployer.sol/Create2Deployer.json"));
const Create3Deployer_json_1 = __importDefault(require("@axelar-network/axelar-gmp-sdk-solidity/artifacts/contracts/deploy/Create3Deployer.sol/Create3Deployer.json"));
exports.CREATE2_DEPLOYER_ADDRESS = '0x98b2920d53612483f91f12ed7754e51b4a77919e';
exports.CREATE3_DEPLOYER_ADDRESS = '0x6513Aedb4D1593BA12e50644401D976aebDc90d8';
exports.Create2Deployer = {
    constractName: Create2Deployer_json_1.default.contractName,
    address: exports.CREATE2_DEPLOYER_ADDRESS,
    abi: Create2Deployer_json_1.default.abi,
};
exports.Create3Deployer = {
    constractName: Create3Deployer_json_1.default.contractName,
    address: exports.CREATE3_DEPLOYER_ADDRESS,
    abi: Create3Deployer_json_1.default.abi,
};
