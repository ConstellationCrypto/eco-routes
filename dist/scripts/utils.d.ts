import { ethers } from 'ethers';
import { Chain, Hex, PublicClient } from 'viem';
import { DeployDisputeNetworkConfig } from './deloyProtocol';
export declare function isZeroAddress(address: Hex): boolean;
export declare function waitMs(ms: number): Promise<unknown>;
/**
 * Waits for the nonce of a client to update.
 *
 * @param client - The `viem` client instance.
 * @param address - The Ethereum address to monitor.
 * @param currentNonce - The current nonce to compare against.
 * @param pollInterval - The interval (in ms) for polling the nonce (default: NONCE_POLL_INTERVAL).
 * @param txCall - The transaction call to make. Must update the nonce by at least 1 or this function will hang and timeout.
 * @returns A promise that resolves to the updated nonce.
 */
export declare function waitForNonceUpdate(client: PublicClient, address: Hex, pollInterval: number, txCall: () => Promise<any>): Promise<number>;
export declare function waitBlocks(provider: ethers.Provider, blocks?: number): Promise<void>;
type AsyncFunction = () => Promise<any>;
/**
 * This method waits on a function to return a non-falsy value for a certain number of blocks
 *
 * @param func the asyn function to call
 * @param options options for the waitBlocks function
 * @returns the result of the function
 */
export declare function retryFunction(func: AsyncFunction, provider: ethers.Provider, ops?: {
    blocks: number;
}): Promise<any>;
export declare function verifyContract(provider: ethers.Provider, contractName: string, address: Hex, args: any[]): Promise<string | undefined>;
/**
 * Checks if the storage Prover is supported on a network
 * @param network the network to check
 * @param contractName the network to check
 * @returns
 */
export declare function storageProverSupported(chainID: number, contractName: string): boolean;
export declare function waitSeconds(seconds: number): Promise<void>;
export declare function getDeployNetwork(networkName: string): DeployDisputeNetworkConfig;
export declare function getDeployChainConfig(chain: Chain): DeployDisputeNetworkConfig;
export declare function execCMD(command: string, options?: {}): Promise<string>;
export {};
