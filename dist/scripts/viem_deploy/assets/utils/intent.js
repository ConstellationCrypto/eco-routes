"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intentVaultAddress = exports.hashIntent = exports.hashReward = exports.hashRoute = exports.decodeIntent = exports.encodeIntent = exports.decodeReward = exports.encodeReward = exports.decodeRoute = exports.encodeRoute = void 0;
const viem_1 = require("viem");
const utils_1 = require("./utils");
const abi_1 = require("../abi");
/**
 * The Route struct object in the IntentSource ABI
 */
const RouteStruct = (0, utils_1.extractAbiStruct)(abi_1.IntentSourceAbi, 'route');
/**
 * The Reward struct object in the IntentSource ABI
 */
const RewardStruct = (0, utils_1.extractAbiStruct)(abi_1.IntentSourceAbi, 'reward');
/**
 * The Reward struct object in the IntentSource ABI
 */
const IntentStruct = (0, utils_1.extractAbiStruct)(abi_1.IntentSourceAbi, 'intent');
/**
 * Encodes the route parameters
 * @param route the route to encode
 * @returns
 */
function encodeRoute(route) {
    return (0, viem_1.encodeAbiParameters)([{ type: 'tuple', components: RouteStruct }], [route]);
}
exports.encodeRoute = encodeRoute;
/**
 * Decodes the route hex
 * @param route the route to decode
 * @returns
 */
function decodeRoute(route) {
    return (0, viem_1.decodeAbiParameters)([{ type: 'tuple', components: RouteStruct }], route)[0];
}
exports.decodeRoute = decodeRoute;
/**
 * Encodes the reward parameters
 * @param reward the reward to encode
 * @returns
 */
function encodeReward(reward) {
    return (0, viem_1.encodeAbiParameters)([{ type: 'tuple', components: RewardStruct }], [reward]);
}
exports.encodeReward = encodeReward;
/**
 * Decodes the reward hex
 * @param reward the reward to decode
 * @returns
 */
function decodeReward(reward) {
    return (0, viem_1.decodeAbiParameters)([{ type: 'tuple', components: RewardStruct }], reward)[0];
}
exports.decodeReward = decodeReward;
/**
 * Encodes the intent parameters
 * @param intent the intent to encode
 * @returns
 */
function encodeIntent(intent) {
    return (0, viem_1.encodePacked)(IntentStruct, [intent.route, intent.reward]);
}
exports.encodeIntent = encodeIntent;
/**
 * Decodes the intent hex
 * @param intent the intent to decode
 * @returns
 */
function decodeIntent(intent) {
    return (0, viem_1.decodeAbiParameters)([{ type: 'tuple', components: IntentStruct }], intent)[0];
}
exports.decodeIntent = decodeIntent;
/**
 * Hashes the route of an intent
 * @param route the route to hash
 * @returns
 */
function hashRoute(route) {
    return (0, viem_1.keccak256)(encodeRoute(route));
}
exports.hashRoute = hashRoute;
/**
 * Hashes the reward of an intent
 * @param reward the reward to hash
 * @returns
 */
function hashReward(reward) {
    return (0, viem_1.keccak256)(encodeReward(reward));
}
exports.hashReward = hashReward;
/**
 * Hashes the intent and its sub structs
 * @param intent the intent to hash
 * @returns
 */
function hashIntent(intent) {
    const routeHash = hashRoute(intent.route);
    const rewardHash = hashReward(intent.reward);
    const intentHash = (0, viem_1.keccak256)((0, viem_1.encodePacked)(['bytes32', 'bytes32'], [routeHash, rewardHash]));
    return {
        routeHash,
        rewardHash,
        intentHash,
    };
}
exports.hashIntent = hashIntent;
/**
 * Generates the intent vault address using CREATE2
 * @param intentSourceAddress the intent source address
 * @param intent the intent
 * @returns
 */
function intentVaultAddress(intentSourceAddress, intent) {
    const { routeHash } = hashIntent(intent);
    return (0, viem_1.getContractAddress)({
        opcode: 'CREATE2',
        from: intentSourceAddress,
        salt: routeHash,
        bytecode: abi_1.IntentVaultBytecode,
    });
}
exports.intentVaultAddress = intentVaultAddress;
