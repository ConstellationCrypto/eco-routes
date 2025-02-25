"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeIdentifier = exports.encodeTransferNative = exports.encodeTransfer = void 0;
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
async function encodeTransfer(to, value) {
    // Contract ABIs
    const erc20ABI = ['function transfer(address to, uint256 value)'];
    const abiInterface = new hardhat_1.ethers.Interface(erc20ABI);
    const callData = abiInterface.encodeFunctionData('transfer', [to, value]);
    return callData;
}
exports.encodeTransfer = encodeTransfer;
async function encodeTransferNative(to, value) {
    const transferNativeABI = [
        'function transferNative(address _to, uint256 value)',
    ];
    const abiInterface = new hardhat_1.ethers.Interface(transferNativeABI);
    const callData = abiInterface.encodeFunctionData('transferNative', [
        to,
        value,
    ]);
    return callData;
}
exports.encodeTransferNative = encodeTransferNative;
async function encodeIdentifier(counter, chainid) {
    const abiCoder = hardhat_1.ethers.AbiCoder.defaultAbiCoder();
    const encodedData = abiCoder.encode(['uint256', 'uint256'], [counter, chainid]);
    return (0, ethers_1.keccak256)(encodedData);
}
exports.encodeIdentifier = encodeIdentifier;
