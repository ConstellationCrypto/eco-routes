"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVerifyStatus = exports.verifyContract = exports.getContractCreation = exports.waitForSource = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const ETHERSCAN_V2_API_URL = 'https://api.etherscan.io/v2/api';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const DEPLOY_WAIT_TIME_MS = 60000; // 1 minute to wait for the contract bytecode to register on etherscan
const OUTPUT_DIR = path.join(__dirname, '../../artifacts/build-info');
async function waitForSource(timeMs, getter) {
    const start = Date.now();
    let res;
    let a = 0;
    while (Date.now() - start < timeMs) {
        console.log('Waiting for source...', a++);
        try {
            res = await getter();
            if (res.message === 'OK' &&
                res.result &&
                res.result[0] &&
                res.result[0].contractAddress) {
                return res;
            }
        }
        catch (e) {
            console.error(e);
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    return res;
}
exports.waitForSource = waitForSource;
async function getContractCreation(chainId, address) {
    const urlparam = {
        chainid: `${chainId}`,
        module: 'contract',
        action: 'getcontractcreation',
        contractaddresses: address,
        apikey: ETHERSCAN_API_KEY,
    };
    const addParams = new URLSearchParams(urlparam).toString();
    const url = ETHERSCAN_V2_API_URL + '?' + addParams;
    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    });
    const res = await result.json();
    console.log(res);
    return res;
}
exports.getContractCreation = getContractCreation;
async function verifyContract(ver) {
    if (!ETHERSCAN_API_KEY) {
        throw new Error('ETHERSCAN_API_KEY not found');
    }
    await waitForSource(DEPLOY_WAIT_TIME_MS, async () => await getContractCreation(ver.chainId, ver.contractaddress));
    console.log('Current directory:', __dirname);
    console.log('Artifact Output directory:', OUTPUT_DIR);
    const outputData = await readOutputFile();
    const metadata = JSON.parse(outputData.output.contracts[ver.contractFilePath][ver.contractname]
        .metadata);
    const version = `v${metadata.compiler.version}`;
    const target = Object.entries(metadata.settings.compilationTarget)[0].join(':');
    const sources = Object.entries(outputData.input.sources).reduce((acc, [key, value]) => {
        acc[key] = { content: value.content };
        return acc;
    }, {});
    const args = ver.constructorArguements;
    console.log(target);
    console.log(version);
    console.log(metadata.settings);
    console.log(Object.keys(sources).length);
    console.log('Args length: ', args.length);
    const standardJson = {
        language: metadata.language,
        sources,
        settings: {
            viaIR: metadata.settings.viaIR,
            optimizer: metadata.settings.optimizer,
            evmVersion: metadata.settings.evmVersion,
            remappings: metadata.settings.remappings,
            libraries: metadata.settings.libraries,
        },
    };
    const body = {
        chainId: `${ver.chainId}`,
        contractaddress: ver.contractaddress,
        sourceCode: JSON.stringify(standardJson),
        codeformat: 'solidity-standard-json-input',
        contractname: target,
        compilerversion: version,
        constructorArguements: args,
    };
    const str = new URLSearchParams(body).toString();
    // console.log(str)
    try {
        const urlparam = {
            chainid: `${ver.chainId}`,
            module: 'contract',
            action: 'verifysourcecode',
            apikey: ETHERSCAN_API_KEY,
        };
        const addParams = new URLSearchParams(urlparam).toString();
        const url = ETHERSCAN_V2_API_URL + '?' + addParams;
        const result = await fetch(url, {
            method: 'POST',
            body: str,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        const res = await result.json();
        console.log(res);
        const guid = res.result;
        await checkVerifyStatus(ver.chainId, guid);
    }
    catch (e) {
        console.error(e);
    }
}
exports.verifyContract = verifyContract;
async function checkVerifyStatus(chainId, guid) {
    try {
        const urlparam = {
            chainid: `${chainId}`,
            module: 'contract',
            action: 'checkverifystatus',
            guid,
            apikey: ETHERSCAN_API_KEY,
        };
        const addParams = new URLSearchParams(urlparam).toString();
        const url = ETHERSCAN_V2_API_URL + '?' + addParams;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        const res = await result.json();
        console.log(res);
    }
    catch (e) {
        console.error(e);
    }
}
exports.checkVerifyStatus = checkVerifyStatus;
async function readOutputFile() {
    const filePath = await getFirstJsonFile();
    if (!filePath) {
        throw new Error('No JSON file found in directory');
    }
    try {
        const data = await fs_1.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}
async function getFirstJsonFile() {
    try {
        const files = await fs_1.promises.readdir(OUTPUT_DIR);
        for (const file of files) {
            if (path.extname(file) === '.json') {
                return path.join(OUTPUT_DIR, file);
            }
        }
        return null;
    }
    catch (error) {
        console.error('Error reading directory:', error);
        throw error;
    }
}
