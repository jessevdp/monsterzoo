import NumberInput from '../NumberInput';

describe('constructor', () => {
    it('overwrites the [attributes.type] to be \'number\'', () => {
        const input = new NumberInput('name', 'label', { type: 'foo' });
        expect(input.state.attributes.type).toBe('number');
        input.cleanup();
    })
})

