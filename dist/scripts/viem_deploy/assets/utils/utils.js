"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAbiStruct = void 0;
/**
 * Extracts the ABI struct with the given name
 * @param params the abi
 * @param structName the name of the struct
 */
function extractAbiStruct(abi, structName) {
    const obj = extractAbiStructRecursive(abi, structName);
    if (!obj) {
        throw ExtractAbiStructFailed(structName);
    }
    // @ts-expect-error components is always present for structs
    return obj['components'];
}
exports.extractAbiStruct = extractAbiStruct;
/**
 * Recursively extracts the ABI struct with the given name
 * @param params the abi
 * @param structName the name of the struct
 */
function extractAbiStructRecursive(abi, structName) {
    for (const item of abi) {
        const obj = item;
        if (obj.name === structName) {
            return obj;
        }
        if (obj.inputs) {
            const result = extractAbiStructRecursive(obj.inputs, structName);
            if (result) {
                return result;
            }
        }
        if (obj.components) {
            const result = extractAbiStructRecursive(obj.components, structName);
            if (result) {
                return result;
            }
        }
    }
}
/**
 * The error thrown when the struct could not be extracted from an abi
 * @param structName the name of the struct
 * @returns
 */
function ExtractAbiStructFailed(structName) {
    return new Error(`Could not extract the structure from abi: ${structName}`);
}
