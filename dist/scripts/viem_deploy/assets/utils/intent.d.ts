import { Hex, Abi, ContractFunctionArgs } from 'viem';
import { IntentSourceAbi } from '../abi';
/**
 * Extracts the functions from an ABI
 */
export type ExtractAbiFunctions<abi extends Abi> = Extract<abi[number], {
    type: 'function';
}>;
/**
 * Define the type for the Intent struct in the IntentSource
 */
export type IntentType = ContractFunctionArgs<typeof IntentSourceAbi, 'pure', 'getIntentHash'>[number];
/**
 * Define the type for the Route struct in IntentSource
 */
export type RouteType = IntentType['route'];
/**
 * Define the type for the Reward struct in IntentSource
 */
export type RewardType = IntentType['reward'];
/**
 * Encodes the route parameters
 * @param route the route to encode
 * @returns
 */
export declare function encodeRoute(route: RouteType): `0x${string}`;
/**
 * Decodes the route hex
 * @param route the route to decode
 * @returns
 */
export declare function decodeRoute(route: Hex): RouteType;
/**
 * Encodes the reward parameters
 * @param reward the reward to encode
 * @returns
 */
export declare function encodeReward(reward: RewardType): `0x${string}`;
/**
 * Decodes the reward hex
 * @param reward the reward to decode
 * @returns
 */
export declare function decodeReward(reward: Hex): RewardType;
/**
 * Encodes the intent parameters
 * @param intent the intent to encode
 * @returns
 */
export declare function encodeIntent(intent: IntentType): `0x${string}`;
/**
 * Decodes the intent hex
 * @param intent the intent to decode
 * @returns
 */
export declare function decodeIntent(intent: Hex): IntentType;
/**
 * Hashes the route of an intent
 * @param route the route to hash
 * @returns
 */
export declare function hashRoute(route: RouteType): Hex;
/**
 * Hashes the reward of an intent
 * @param reward the reward to hash
 * @returns
 */
export declare function hashReward(reward: RewardType): Hex;
/**
 * Hashes the intent and its sub structs
 * @param intent the intent to hash
 * @returns
 */
export declare function hashIntent(intent: IntentType): {
    routeHash: Hex;
    rewardHash: Hex;
    intentHash: Hex;
};
/**
 * Generates the intent vault address using CREATE2
 * @param intentSourceAddress the intent source address
 * @param intent the intent
 * @returns
 */
export declare function intentVaultAddress(intentSourceAddress: Hex, intent: IntentType): Hex;
