"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('Utils Tests', () => {
    beforeAll(() => {
        console.log = jest.fn();
        console.error = jest.fn();
    });
    describe('on compareSemverIntegerStrings', () => {
        it('should return 1 if num1 is larger', () => {
            expect((0, utils_1.compareSemverIntegerStrings)('1', '0')).toEqual(1);
            expect((0, utils_1.compareSemverIntegerStrings)('2', '12')).toEqual(1);
            expect((0, utils_1.compareSemverIntegerStrings)('12', '11')).toEqual(1);
        });
        it('should return -1 if num1 is smaller', () => {
            expect((0, utils_1.compareSemverIntegerStrings)('2', '21')).toEqual(-1);
            expect((0, utils_1.compareSemverIntegerStrings)('23', '24')).toEqual(-1);
            expect((0, utils_1.compareSemverIntegerStrings)('1', '12')).toEqual(-1);
        });
        it('should return 0 if num1 is equal', () => {
            expect((0, utils_1.compareSemverIntegerStrings)('2', '2')).toEqual(0);
            expect((0, utils_1.compareSemverIntegerStrings)('23', '23')).toEqual(0);
            expect((0, utils_1.compareSemverIntegerStrings)('12', '12')).toEqual(0);
        });
    });
});
