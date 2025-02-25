"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHashShort = exports.getGitHash = void 0;
const child_process_1 = require("child_process");
function getGitHash() {
    return (0, child_process_1.execSync)('git rev-parse HEAD').toString().trim();
}
exports.getGitHash = getGitHash;
function getGitHashShort() {
    return (0, child_process_1.execSync)('git rev-parse --short HEAD').toString().trim();
}
exports.getGitHashShort = getGitHashShort;
