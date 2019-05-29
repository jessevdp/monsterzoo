import Input from '../Input';
import { Component } from '@local/system';

beforeEach(() => {
    document.body.innerHTML = '';
});

it('renders correctly', () => {
    const input = new Input('name', 'label');
    input.state.attributes = { foo: 'bar', bar: 'foo' };
    expect(input.view()).toMatchSnapshot();
    input.cleanup();
})

describe('constructor', () => {
    it('sets the [name] on state', () => {
        const name = 'foobar';
        const input = new Input(name, 'label');
        expect(input.state.name).toBe(name);
        input.cleanup();
    })
    it('sets the [label] on state', () => {
        const label = 'foobar';
        const input = new Input('name', label);
        expect(input.state.label).toBe(label);
        input.cleanup();
    })
    it('uses defaults for the [attributes]', () => {
        const input = new Input('foobar');
        expect(input.state.attributes).toMatchSnapshot();
        input.cleanup();
    })
    it('merges the passed attributes with the defaults', () => {
        const input = new Input('name', 'label', { foo: 'bar' });
        expect(input.state.attributes).toHaveProperty('foo', 'bar');
        input.cleanup();
    })
    it('overwrites attribute defaults with passed attributes', () => {
        const input = new Input('name', 'label', { type: 'number' });
        expect(input.state.attributes.type).toBe('number');
        input.cleanup();
    })
    it('accepts an optional [value] attribute on [attributes] to initialze state.value', () => {
        const value = 'value';
        const attributes = { foo: 'bar', value };
        const input = new Input('name', 'label', attributes);
        expect(input.state.value).toBe(value);
        expect(input.state.attributes.foo).toBe(attributes.foo);
        expect(input.state.attributes.value).toBe(undefined);
        input.cleanup();
    })
})

describe('htmlAttributes', () => {
    it('can convert [attributes] state object into an HTML string', () => {
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

describe('[label] setter', () => {
    it('updates the [label] variable on state', () => {
        const newLabel = 'new label';
        const input = new Input('name', 'label');
        input.label = newLabel;
        expect(input.state.label).toBe(newLabel);
        input.cleanup();
    })
    it('uses the setState method', () => {
        const newLabel = 'new label';
        const input = new Input('name', 'label');
        const spy = jest.spyOn(Component.prototype, 'setState');
        input.label = newLabel;
        expect(spy).toHaveBeenCalledWith({ label: newLabel });
        input.cleanup();
    })
})

describe('[value] setter', () => {
    it('updates the [value] variable on state', () => {
        const newValue = 'new value';
        const input = new Input('name', 'label', 'value');
        input.value = newValue;
        expect(input.state.value).toBe(newValue);
        input.cleanup();
    })
    it('updates the value of the input box', () => {
        const newValue = 'new value';
        const input = new Input('name', 'label');
        document.body.innerHTML = input.render();
        input.value = newValue;
        const $input = document.querySelector('input');
        expect($input.value).toBe(newValue);
        input.cleanup();
    })
    it('uses the setState method', () => {
        const newValue = 'new value';
        const input = new Input('name', 'label');
        const spy = jest.spyOn(Component.prototype, 'setState');
        input.value = newValue;
        expect(spy).toHaveBeenCalledWith({ value: newValue });
        input.cleanup();
    })
})
describe('[value] getter', () => {
    it('returns the value of state.value', () => {
        const value = 'value';
        const input = new Input('name', 'label');
        input.state.value = value;
        expect(input.value).toBe(value);
        input.cleanup();
    })
})

describe('events', () => {
    it('updates [value] state when the value of the input changes', () => {
        // Arrange
        const newValue = 'new value';
        const input = new Input('name', 'label');
        document.body.innerHTML = input.render();
        const $input = document.querySelector('input');

        // Act
        $input.value = newValue;
        $input.dispatchEvent(new Event('change'));

        // Assert
        expect(input.value).toBe(newValue);

        // Cleanup
        input.cleanup();
    })
})