import { Hex } from 'viem';
/**
 * Encodes a erc20 transfer
 * @param to the address to send to
 * @param value the amount to send
 * @returns
 */
export declare function encodeERC20Transfer(to: Hex, value: bigint): Hex;
