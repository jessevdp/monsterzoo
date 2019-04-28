import { isObject } from './typecheck';

describe('isObject', () => {
    it(`returns 'true' for objects`, () => {
        const object = {};
        const result = isObject(object);
        expect(result).toBeTruthy();
    })
    test.each([
        [[]],
        ['string'],
        [10],
        [false],
        [null]
    ])(`returns 'false' for non-objects (%#)`, (param) => {
        const result = isObject(param);
        expect(result).toBeFalsy();
    })
})