"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = require("viem/chains");
const utils_1 = require("../utils");
describe('Utils Tests', () => {
    describe('on storageProverSupported', () => {
        it('should support all the chains it supports', () => {
            expect((0, utils_1.storageProverSupported)(chains_1.base.id, 'Prover')).toBeTruthy();
            expect((0, utils_1.storageProverSupported)(chains_1.baseSepolia.id, 'Prover')).toBeTruthy();
            expect((0, utils_1.storageProverSupported)(chains_1.optimism.id, 'Prover')).toBeTruthy();
            expect((0, utils_1.storageProverSupported)(chains_1.optimismSepolia.id, 'Prover')).toBeTruthy();
            expect((0, utils_1.storageProverSupported)(chains_1.mantle.id, 'Prover')).toBeTruthy();
            expect((0, utils_1.storageProverSupported)(chains_1.mantleSepoliaTestnet.id, 'Prover')).toBeTruthy();
        });
        it('should not support storage provers on unsupported chains', () => {
            expect((0, utils_1.storageProverSupported)(chains_1.polygon.id, 'Prover')).toBeFalsy();
        });
        it('should support non-storage-provers on unsupported chains', () => {
            expect((0, utils_1.storageProverSupported)(chains_1.polygon.id, 'Inbox')).toBeTruthy();
        });
    });
});
