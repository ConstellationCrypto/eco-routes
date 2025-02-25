import { Hex } from 'viem';
export type VerifyContractType = {
    chainId: number;
    codeformat: 'solidity-standard-json-input' | 'solidity-single-file';
    constructorArguements: string;
    contractname: string;
    contractaddress: Hex;
    contractFilePath: string;
};
export declare function waitForSource(timeMs: number, getter: () => Promise<any>): Promise<any>;
export declare function getContractCreation(chainId: number, address: Hex): Promise<any>;
export declare function verifyContract(ver: VerifyContractType): Promise<void>;
export declare function checkVerifyStatus(chainId: number, guid: string): Promise<void>;
