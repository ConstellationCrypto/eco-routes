"use strict";
// publish --tag beta --access public # --provenance --access public
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const utils_1 = require("../utils");
const ProtocolVersion_1 = require("../viem_deploy/ProtocolVersion");
const create_package_1 = require("./create_package");
const MainBetaPublishOps = { tag: 'beta', cwd: create_package_1.buildFolder };
const TsBetaPublishOps = { tag: 'beta', cwd: create_package_1.tsBuildFolder };
async function publish(ops = MainBetaPublishOps) {
    await (0, utils_1.execCMD)(`echo starting yarn publish`, ops);
    await (0, utils_1.execCMD)(`"pwd"  pwd`, ops);
    await (0, utils_1.execCMD)(`echo NPM publish: `, JSON.stringify(ops));
    await (0, utils_1.execCMD)(`echo GITHUB_ACTION is $GITHUB_ACTION`, ops);
    await (0, utils_1.execCMD)(`yarn publish --tag ${ops.tag} --access public`, ops);
}
async function publishTs(ops = TsBetaPublishOps) {
    await (0, utils_1.execCMD)(`cp -r build ${ops.cwd}`);
    await (0, utils_1.execCMD)(`rimraf ${ops.cwd}/src`);
    (0, create_package_1.packageBuildTs)();
    await publish(ops);
}
async function main() {
    const pv = new ProtocolVersion_1.ProtocolVersion();
    const tag = pv.getReleaseTag();
    await publish({ tag, cwd: 'build' });
    await publishTs({ tag, cwd: 'buildTs' });
}
main()
    .then(() => { })
    .catch((err) => {
    console.error('Error:', err);
    core_1.default.setFailed(err.message);
});
