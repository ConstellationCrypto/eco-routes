import { Hex } from 'viem';
interface AddressBook {
    [network: string]: {
        [key: string]: string;
    };
}
export declare const PRE_SUFFIX = "-pre";
export declare const jsonFileName = "deployAddresses.json";
export declare const jsonFilePath: string;
export declare const tsFilePath: string;
export declare const csvFilePath: string;
export declare const saltFileName = "salt.json";
export declare const saltPath: string;
export declare function createFile(path?: string): void;
export declare function getJsonFromFile<T>(path?: string): T;
export declare function mergeAddresses(ads: AddressBook, path?: string): void;
export type JsonConfig = {
    chainId: number;
    pre?: boolean;
};
/**
 * Adds a new address to the address json file
 * @param deployNetwork the network of the deployed contract
 * @param key the network id
 * @param value the deployed contract address
 */
export declare function addJsonAddress(deployNetwork: JsonConfig, key: string, value: string): void;
export type SaltsType = {
    salt: Hex;
    saltPre: Hex;
};
export declare function saveDeploySalts(salts: SaltsType): void;
/**
 * Transforms the addresses json file into a typescript file
 * with the correct imports, exports, and types.
 */
export declare function transformAddresses(): void;
export {};
