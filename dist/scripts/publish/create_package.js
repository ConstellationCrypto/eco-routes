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
exports.packageBuildTs = exports.generateBuildPckJson = exports.tsBuildFolder = exports.buildFolder = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const addresses_1 = require("../deploy/addresses");
const lodash_1 = require("lodash");
exports.buildFolder = 'build';
exports.tsBuildFolder = 'buildTs';
const packageJsonPath = path.join(__dirname, '../../package.json');
const outputPath = path.join(__dirname, `../../${exports.buildFolder}/package.json`);
const outputTsPath = path.join(__dirname, `../../${exports.tsBuildFolder}/package.json`);
function generateBuildPckJson() {
    console.log('start package json generation');
    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading package.json:', err);
            return;
        }
        const packageJson = JSON.parse(data);
        // delete packageJson.dependencies
        delete packageJson.devDependencies;
        delete packageJson.scripts;
        delete packageJson.files;
        delete packageJson.engines;
        fs.writeFile(outputPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing package.json:', err);
                return;
            }
            console.log('package.json has been created successfully.');
        });
    });
}
exports.generateBuildPckJson = generateBuildPckJson;
function packageBuildTs() {
    const original = (0, addresses_1.getJsonFromFile)(outputPath);
    original.name = original.name + '-ts';
    const keepDeps = (0, lodash_1.pick)(original.dependencies, ['viem']);
    original.dependencies = keepDeps;
    (0, addresses_1.createFile)(outputTsPath);
    fs.writeFileSync(outputTsPath, JSON.stringify(original, null, 2), 'utf8');
}
exports.packageBuildTs = packageBuildTs;
