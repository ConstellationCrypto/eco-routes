import { Abi, AbiParameter } from 'viem';
/**
 * Extracts the ABI struct with the given name
 * @param params the abi
 * @param structName the name of the struct
 */
export declare function extractAbiStruct<abi extends Abi, AbiReturn extends readonly AbiParameter[]>(abi: abi, structName: string): AbiReturn;
