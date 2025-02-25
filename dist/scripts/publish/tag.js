"use strict";
// publish --tag beta --access public # --provenance --access public
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const ProtocolVersion_1 = require("../viem_deploy/ProtocolVersion");
// GITHUB_REF=refs/tags/v0.0.509-beta GITHUB_OUTPUT=$(pwd)/a.txt npx tsx scripts/publish/publish.ts
/**
 * Sets the NPM_TAG environment variable for npm publishing through github actions
 */
function setNpmTag() {
    const pv = new ProtocolVersion_1.ProtocolVersion();
    (0, utils_1.execCMD)(`echo "NPM_TAG=${pv.getReleaseTag()}" >> $GITHUB_ENV`);
}
setNpmTag();
