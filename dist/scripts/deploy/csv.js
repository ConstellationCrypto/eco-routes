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
exports.addressesToCVS = void 0;
const fs = __importStar(require("fs"));
const addresses_1 = require("./addresses");
// Function to append data to the CSV
function appendToCSV(filePath, data) {
    const rows = Object.entries(data).map(([key, values]) => {
        const { Prover, IntentSource, Inbox, HyperProver } = values;
        return `${key},${Prover},${IntentSource},${Inbox},${HyperProver}`;
    });
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'Chain,Prover,IntentSource,Inbox,HyperProver\n', 'utf8');
    }
    fs.appendFileSync(filePath, rows.join('\n') + '\n', 'utf8');
}
// Read JSON file and append its contents to the CSV
function addressesToCVS() {
    if (!fs.existsSync(addresses_1.jsonFilePath)) {
        console.error('JSON file not found:', addresses_1.jsonFilePath);
        return;
    }
    const jsonData = JSON.parse(fs.readFileSync(addresses_1.jsonFilePath, 'utf8'));
    if (typeof jsonData !== 'object' || Array.isArray(jsonData)) {
        console.error('Invalid JSON data format. Expected an object.');
        return;
    }
    appendToCSV(addresses_1.csvFilePath, jsonData);
    console.log('Data appended successfully from JSON!');
}
exports.addressesToCVS = addressesToCVS;
