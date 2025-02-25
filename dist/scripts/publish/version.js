"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const ProtocolVersion_1 = require("../viem_deploy/ProtocolVersion");
async function main() {
    const pv = new ProtocolVersion_1.ProtocolVersion();
    pv.updateProjectVersion();
    await pv.getDeployChains();
}
main()
    .then(() => { })
    .catch((err) => {
    console.error('Error:', err);
    core_1.default.setFailed(err.message);
});
