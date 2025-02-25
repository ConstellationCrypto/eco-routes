"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSemverIntegerStrings = exports.getConstructorArgs = exports.getClient = exports.getGitRandomSalt = exports.getDeployAccount = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const gitUtils_1 = require("../publish/gitUtils");
const sepolia_1 = __importDefault(require("./contracts/sepolia"));
const mainnet_1 = __importDefault(require("./contracts/mainnet"));
function getDeployAccount() {
    // Load environment variables
    const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '0x';
    return (0, accounts_1.privateKeyToAccount)(DEPLOYER_PRIVATE_KEY);
}
exports.getDeployAccount = getDeployAccount;
/**
 * @returns A random salt generated from the git hash and a random number
 */
function getGitRandomSalt() {
    return (0, viem_1.sha256)(`0x${(0, gitUtils_1.getGitHash)() + Math.random().toString()}`); // Random salt
}
exports.getGitRandomSalt = getGitRandomSalt;
function getClient(chain, account) {
    const client = (0, viem_1.createWalletClient)({
        transport: (0, viem_1.http)(getUrl(chain)),
        chain,
        account,
    });
    return client.extend(viem_1.publicActions);
}
exports.getClient = getClient;
function getUrl(chain) {
    return getAchemyRPCUrl(chain) || chain.rpcUrls.default.http[0];
}
function getAchemyRPCUrl(chain) {
    const apiKey = process.env.ALCHEMY_API_KEY;
    if (!chain.rpcUrls.alchemy) {
        return undefined;
    }
    return chain.rpcUrls.alchemy.http[0] + '/' + apiKey;
}
function getConstructorArgs(chain, contract) {
    return chain.testnet ? sepolia_1.default[contract] : mainnet_1.default[contract];
}
exports.getConstructorArgs = getConstructorArgs;
/**
 * Compares two integer strings left to right by digit to get the larger one
 * @param num1 - The first integer string
 * @param num2 - The second integer string
 * @returns 1 if num1 is larger, -1 if num2 is larger, 0 if they are equal
 */
function compareSemverIntegerStrings(num1, num2) {
    const len1 = num1.length;
    const len2 = num2.length;
    // Pad the shorter string with trailing zeros
    if (len1 > len2) {
        num2 = num2.padEnd(len1, '0');
    }
    else if (len2 > len1) {
        num1 = num1.padEnd(len2, '0');
    }
    for (let i = 0; i < num1.length; i++) {
        const digit1 = parseInt(num1[i], 10);
        const digit2 = parseInt(num2[i], 10);
        if (digit1 > digit2) {
            return 1;
        }
        else if (digit1 < digit2) {
            return -1;
        }
    }
    return 0;
}
exports.compareSemverIntegerStrings = compareSemverIntegerStrings;
