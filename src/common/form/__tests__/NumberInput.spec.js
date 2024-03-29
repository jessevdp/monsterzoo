import NumberInput from '../NumberInput';
import Input from '../Input';

beforeEach(() => {
    document.body.innerHTML = '';
});


describe('constructor', () => {
    it('overwrites the [attributes.type] to be \'number\'', () => {
        const input = new NumberInput('name', 'label', { type: 'foo' });
        expect(input.state.attributes.type).toBe('number');
        input.cleanup();
    })
    it('defaults the [step] to 1', () => {
        const input = new NumberInput('name', 'label');
        expect(input.state.attributes.step).toBe(1);
        input.cleanup();
    })
})

describe('[value] getter', () => {
    it('converts the [value] into a number', () => {
        const value = '10';
        const input = new NumberInput('name', 'label');
        input.setState({ value })
        expect(input.value).toBe(Number(value));
        input.cleanup();
    })
})

describe('[value] setter', () => {
    test.each([
        [0],
        [10],
        [5],
    ])('can set the value inside the bounds of min/max (%p)', value => {
        const input = new NumberInput('name', 'label', { min: 0, max: 10 });
        input.value = value;
        expect(input.value).toBe(value);
        input.cleanup();
    })
    it('sets the value to [max] when the value is higher than max', () => {
        const max = 10;
        const value = 11;
        const input = new NumberInput('name', 'label', { min: 0, max });
        input.value = value;
        expect(input.value).toBe(max);
        input.cleanup();
    })
    it('sets the value to [min] when the value is lower than min', () => {
        const min = 0;
        const value = -10;
        const input = new NumberInput('name', 'label', { min, max: 10 });
        input.value = value;
        expect(input.value).toBe(min);
        input.cleanup();
    })
    test.each([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 5],
        [4, 5],
        [5, 5],
    ])('rounds the value to the nearest step (%p)', (value, rounded) => {
        const attributes = { min: 0, max: 10, step: 5 };
        const input = new NumberInput('name', 'label', attributes);
        input.value = value;
        expect(input.value).toBe(rounded);
        input.cleanup();
    })
    it('offsets the rounding to the minimum value', () => {
        const attributes = { min: -1, max: 10, step: 2 };
        const value = 0;
        const rounded = 1;
        const input = new NumberInput('name', 'label', attributes);
        input.value = value;
        expect(input.value).toBe(rounded);
        input.cleanup();
    })
    it('respects the max value when rounding the value to the nearest step', () => {
        const attributes = { min: 0, max: 7, step: 2 };
        const value = 7;
        const rounded = 6;
        const input = new NumberInput('name', 'label', attributes);
        input.value = value;
        expect(input.value).toBe(rounded);
        input.cleanup();
    })
})

describe('setAttributes', () => {
    describe('calls setAttributes on it\'s super component (Input)', () => {
        const attributes = { min: 0, max: 10 };
        const input = new NumberInput('name', 'label');
        const spy = jest.spyOn(Input.prototype, 'setAttributes');
        input.setAttributes(attributes);
        expect(spy).toHaveBeenCalledWith(attributes);
        input.cleanup();
    })
    describe('when [min] is updated and the current value is below the new min', () => {
        it('updates the current value to the new minimum', () => {
            const min = 0;
            const newMin = 3;
            const input = new NumberInput('name', 'label', { min, max: 10 });
            input.value = min;
            input.setAttributes({ min: newMin });
            expect(input.value).toBe(newMin);
            input.cleanup();
        })
    })
    describe('when [max] is updated and the current value is above the new max', () => {
        it('updates the current value to the new minimum', () => {
            const max = 10;
            const newMax = 6;
            const input = new NumberInput('name', 'label', { min: 0, max });
            input.value = max;
            input.setAttributes({ max: newMax });
            expect(input.value).toBe(newMax);
            input.cleanup();
        })
        describe('when [max] is not a valid step', () => {
            it('it rounds the value to the step nearest to max', () => {
                const max = 10;
                const newMax = 7;
                const rounded = 6;
                const input = new NumberInput('name', 'label', { min: 0, max, step: 3 });
                input.value = max;
                input.setAttributes({ max: newMax });
                expect(input.value).toBe(rounded);
                input.cleanup();
            })
        })
    })
})

describe('view', () => {
    it('disables the input when min & max are equal', () => {
        const input = new NumberInput('name', 'label', { min: 2, max: 2 });
        document.body.innerHTML = input.render();
        const $input = document.querySelector('input');
        expect($input.disabled).toBeTruthy();
        input.cleanup();
    })
    it('does not disable the input when min & max are not equal', () => {
        const input = new NumberInput('name', 'label', { min: 0, max: 10 });
        document.body.innerHTML = input.render();
        const $input = document.querySelector('input');
        expect($input.disabled).toBeFalsy();
        input.cleanup();
    })
})
