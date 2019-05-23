import Input from '../Input';

describe('constructor', () => {
    it('sets the [name] on state', () => {
        const name = 'foobar';
        const input = new Input(name);
        expect(input.state.name).toBe(name);
        input.cleanup();
    })
    it('uses defaults for the [attributes]', () => {
        const input = new Input('foobar');
        expect(input.state.attributes).toMatchSnapshot();
        input.cleanup();
    })
    it('merges the passed attributes with the defaults', () => {
        const input = new Input('foobar', { foo: 'bar' });
        expect(input.state.attributes).toHaveProperty('foo', 'bar');
        input.cleanup();
    })
    it('overwrites attribute defaults with passed attributes', () => {
        const input = new Input('foobar', { type: 'number' });
        expect(input.state.attributes.type).toBe('number');
        input.cleanup();
    })
})

describe('htmlAttributes', () => {
    it('can convert [attributes] into an HTML string', () => {
        const attributes = { foo: 'bar', number: 10 }
        const expected = 'foo="bar" number="10"';
        const input = new Input('name');
        input.state.attributes = attributes;
        expect(input.htmlAttributes()).toBe(expected);
        input.cleanup();
    })
})