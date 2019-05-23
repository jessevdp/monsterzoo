import Input from '../Input';

it('renders correctly', () => {
    const input = new Input('foobar');
    input.state.attributes = { foo: 'bar', bar: 'foo' };
    expect(input.view()).toMatchSnapshot();
    input.cleanup();
})

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

describe('setAttributes', () => {
    it('accepts an object to update the attributes', () => {
        const input = new Input('name');
        const attributes = { foo: 'bar' };
        input.setAttributes(attributes);
        expect(input.state.attributes.foo).toBe(attributes.foo);
        input.cleanup();
    })
    it('accepts a function to update the attributes', () => {
        const input = new Input('name');
        const attributes = { foo: 'bar' };
        input.setAttributes(() => attributes);
        expect(input.state.attributes.foo).toBe(attributes.foo);
        input.cleanup();
    })
    it('passes the old attributes to the passed function', () => {
        // Arrange
        const oldAttributes = { foo: 'foo' };
        const newAttributes = { foo: 'bar' };
        const fn = jest.fn(() => newAttributes);
        const input = new Input('name');
        input.state.attributes = oldAttributes;

        // Act
        input.setAttributes(fn);

        // Assert
        expect(fn).toHaveBeenCalledWith(oldAttributes);

        // Cleanup
        input.cleanup();
    })
    it('overwrites old values', () => {
        const oldAttributes = { foo: 'foo' };
        const newAttributes = { foo: 'bar' };
        const input = new Input('name', oldAttributes);
        input.setAttributes(newAttributes);
        expect(input.state.attributes.foo).toBe(newAttributes.foo);
        input.cleanup();
    })
    it('leaves other values intact', () => {
        const input = new Input('name');
        const fooAttribute = { foo: 'foo' };
        const barAttribute = { bar: 'bar' };
        input.setAttributes(fooAttribute);
        input.setAttributes(barAttribute);
        expect(input.state.attributes.foo).toBe(fooAttribute.foo);
        expect(input.state.attributes.bar).toBe(barAttribute.bar);
        input.cleanup();
    })
})