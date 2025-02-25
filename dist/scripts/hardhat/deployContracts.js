"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContracts = void 0;
const child_process_1 = require("child_process");
process.env.DEPLOY_CI = 'true';
const mainnetDep = [
    'deployPolygon',
    'deployArbitrum',
    'deployMantle',
    'deployBase',
    'deployOptimism',
];
const sepoliaDep = mainnetDep.flatMap((dep) => {
    return dep.toLocaleLowerCase().includes('polygon') ? [] : [dep + 'Sepolia'];
});
function deployContracts() {
    for (const dep of sepoliaDep) {
        callYarnCmd(dep);
    }
    for (const dep of mainnetDep) {
        callYarnCmd(dep);
    }
}
exports.deployContracts = deployContracts;
function callYarnCmd(cmd) {
    (0, child_process_1.execSync)(`yarn ${cmd}`, { stdio: 'inherit' });
}
