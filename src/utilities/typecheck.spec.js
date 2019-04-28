import { 
    isObject,
    isArray,
    isString,
    isNumber,
    isBoolean,
    isFunction,
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
        [undefined],
        [NaN],
        [Infinity]
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
        [undefined],
        [NaN],
        [Infinity]
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
        [undefined],
        [NaN],
        [Infinity]
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

describe('isBoolean', () => {
    test.each([
        [true],
        [false]
    ])(`returns 'true' for booleans (%p)`, (boolean) => {
        const result = isBoolean(boolean);
        expect(result).toBeTruthy();
    })
    test.each([
        [{}],
        [[]],
        ['string'],
        [10],
        [null],
        [undefined],
        [NaN],
        [Infinity]
    ])(`returns 'false' for other types (%#)`, (param) => {
        const result = isBoolean(param);
        expect(result).toBeFalsy();
    })
})

describe('isFunction', () => {
    it(`returns 'true' for functions`, () => {
        const fn = () => {};
        const result = isFunction(fn);
        expect(result).toBeTruthy();
    })
    test.each([
        [{}],
        [[]],
        ['string'],
        [10],
        [false],
        [null],
        [undefined],
        [NaN],
        [Infinity]
    ])(`returns 'false' for other types (%#)`, (param) => {
        const result = isFunction(param);
        expect(result).toBeFalsy();
    })
})