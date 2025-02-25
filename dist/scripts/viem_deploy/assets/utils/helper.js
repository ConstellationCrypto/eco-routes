"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeERC20Transfer = void 0;
const viem_1 = require("viem");
/**
 * Encodes a erc20 transfer
 * @param to the address to send to
 * @param value the amount to send
 * @returns
 */
function encodeERC20Transfer(to, value) {
    return (0, viem_1.encodeFunctionData)({
        abi: viem_1.erc20Abi,
        functionName: 'transfer',
        args: [to, value],
    });
}
exports.encodeERC20Transfer = encodeERC20Transfer;
