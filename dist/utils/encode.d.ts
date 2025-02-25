import { DataHexString } from 'ethers/lib.commonjs/utils/data';
import { NumberLike } from '@nomicfoundation/hardhat-network-helpers/dist/src/types.js';
export declare function encodeTransfer(to: string, value: number): Promise<DataHexString>;
export declare function encodeTransferNative(to: string, value: number): Promise<DataHexString>;
export declare function encodeIdentifier(counter: number, chainid: NumberLike): Promise<DataHexString>;
