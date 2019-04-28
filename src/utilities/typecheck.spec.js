import { 
    isObject,
    isArray,
    isString,
    isNumber,
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
        [null],
        [undefined]
    ])(`returns 'false' for non-objects (%#)`, (param) => {
        const result = isObject(param);
        expect(result).toBeFalsy();
    })
})

describe('isArray', () => {
    it(`returns 'true' for arrays`, () => {
        const array = [];
        const result = isArray(array);
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

describe('isString', () => {
    it(`returns 'true' for strings`, () => {
        const string = 'string';
        const result = isString(string);
        expect(result).toBeTruthy();
    })
    test.each([
        [{}],
        [[]],
        [10],
        [true],
        [null],
        [undefined]
    ])(`returns 'false' for other types (%#)`, (param) => {
        const result = isString(param);
        expect(result).toBeFalsy();
    })
})

describe('isNumber', () => {
    it(`returns 'true' for numbers`, () => {
        const number = 10;
        const result = isNumber(number);
        expect(result).toBeTruthy();
    })
    test.each([
        [{}],
        [[]],
        ['string'],
        [true],
        [null],
        [undefined],
        [NaN],
        [Infinity]
    ])(`returns 'false' for other types (%#)`, (param) => {
        const result = isNumber(param);
        expect(result).toBeFalsy();
    })
})