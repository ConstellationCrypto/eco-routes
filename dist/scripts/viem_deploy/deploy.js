"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const ProtocolDeploy_1 = require("./ProtocolDeploy");
async function main() {
    const deploy = new ProtocolDeploy_1.ProtocolDeploy();
    await deploy.deployFullNetwork();
}
main()
    .then((results) => {
    // console.log('Deployment and verification results:', results)
})
    .catch((err) => {
    console.error('Error:', err);
    core_1.default.setFailed(err.message);
});
