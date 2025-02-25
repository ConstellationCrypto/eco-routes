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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Directory containing the JSON files
const abiParentDir = path.join(__dirname, '../../build/src/abi');
const dirs = [
    path.join(abiParentDir, '/contracts'),
    path.join(abiParentDir, '/interfaces'),
];
let mainIndexContent = '';
console.log('start abi exports');
dirs.forEach((abiDir) => {
    console.log(abiDir);
    // Read through the directory and get all .json files
    const jsonFiles = fs
        .readdirSync(abiDir)
        .filter((file) => file.endsWith('.json'));
    // Read each JSON file and parse its content
    const data = jsonFiles.reduce((acc, file) => {
        const filePath = path.join(abiDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const abiFile = JSON.parse(fileContent);
        acc.push({
            abi: abiFile.abi,
            bytecode: abiFile.bytecode,
            deployedBytecode: abiFile.deployedBytecode,
            contractName: abiFile.contractName,
            sourceName: abiFile.sourceName,
        });
        fs.unlinkSync(filePath);
        return acc;
    }, []);
    let indexContent = '';
    const indexFilePath = path.join(abiDir, 'index.ts');
    // Generate the TypeScript code
    data.forEach((abiFile) => {
        const abi = `${abiFile.contractName}Abi`;
        const bytecode = `${abiFile.contractName}Bytecode`;
        const deployedBytecode = `${abiFile.contractName}DeployedBytecode`;
        indexContent += `export * from './${abiFile.contractName}'\n`;
        const outputContent = `export const ${abi} = ${JSON.stringify(abiFile.abi, null, 2)} as const\n\n` +
            `export const ${bytecode} = "${abiFile.bytecode}"\n\n` +
            `export const ${deployedBytecode} = "${abiFile.deployedBytecode}"\n`;
        const filePath = path.join(abiDir, `${abiFile.contractName}.ts`);
        fs.writeFileSync(filePath, outputContent, 'utf-8');
    });
    fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
    mainIndexContent += `export * from './${abiDir.split('/').pop()}'\n`;
});
fs.writeFileSync(path.join(abiParentDir, 'index.ts'), mainIndexContent, 'utf-8');
console.log('finish abi exports');
