"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const ProtocolDeploy_1 = require("../viem_deploy/ProtocolDeploy");
const ProtocolVersion_1 = require("../viem_deploy/ProtocolVersion");
const addresses_1 = require("./addresses");
const csv_1 = require("./csv");
async function main() {
    const pv = new ProtocolVersion_1.ProtocolVersion();
    const dp = await pv.getDeployChains();
    const deploy = new ProtocolDeploy_1.ProtocolDeploy(dp.chains, dp.salts);
    await deploy.deployFullNetwork(true);
    (0, addresses_1.transformAddresses)();
    (0, csv_1.addressesToCVS)();
}
main()
    .then((results) => {
    // console.log('Deployment and verification results:', results)
})
    .catch((err) => {
    console.error('Error:', err);
    core_1.default.setFailed(err.message);
});
