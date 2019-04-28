import { 
    isObject,
    isArray,
} from './typecheck';

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

describe('isArray', () => {
    it(`returns 'true' for arrays`, () => {
        const object = [];
        const result = isArray(object);
        expect(result).toBeTruthy();
    })
    test.each([
        [{}],
        ['string'],
        [10],
        [false],
        [null],
        [undefined]
    ])(`returns 'false' for other types (%#)`, (param) => {
        const result = isArray(param);
        expect(result).toBeFalsy();
    })
})