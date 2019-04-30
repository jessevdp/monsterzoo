import Component from '../Component';
import { isObject } from '@local/utilities';

jest.mock('@local/system/renderTemplate');

describe('constructor', () => {
    it('sets up a [state] object', () => {
        const component = new Component();
        expect(isObject(component.state)).toBeTruthy();
    })
})

describe('render', () => {
    it('calls the [view] function', () => {
        const component = new Component();
        component.view = jest.fn(() => 'rendered view string');
        component.render();
        expect(component.view).toHaveBeenCalled();
    })
    it('returns the result of the view function', () => {
        const component = new Component();
        const expected = 'rendered view string'
        component.view = jest.fn(() => expected);
        const result = component.render();
        expect(result).toBe(expected);
    })
    it('throws if no [view] function is defined', () => {
        const component = new Component();
        component.view = undefined;
        expect(() => component.render()).toThrow();
    })
    it('throws if the [view] attribute is not a function', () => {
        const component = new Component();
        component.view = {};
        expect(() => component.render()).toThrow();
    })
    it('throws if the [view] function does not return a string', () => {
        const component = new Component();
        component.view = () => {};
        expect(() => component.render()).toThrow();
    })
})

describe('setState', () => {
    it('accepts an object to update the state', () => {
        const component = new Component();
        const state = { foo: 'bar' };
        component.setState(state);
        expect(component.state).toEqual(state);
    })
    it('accepts a function to update the state', () => {
        const component = new Component();
        const state = { foo: 'bar' };
        component.setState(() => state);
        expect(component.state).toEqual(state);
    })
    it('passes the old state to the passed function', () => {
        // Arrange
        const component = new Component();
        const oldState = { foo: 'foo' };
        const newState = { foo: 'bar' };
        component.setState(oldState);
        const fn = jest.fn(() => newState);

        // Act
        component.setState(fn);
        
        // Assert
        expect(fn).toHaveBeenCalledWith(oldState);
    })
    it('overwrites old values', () => {
        // Arrange
        const component = new Component();
        const oldState = { foo: 'foo' };
        const newState = { foo: 'bar' };
        component.setState(oldState);

        // Act
        component.setState(newState);
        
        // Assert
        expect(component.state).toEqual(newState);
    })
    it('leaves other values intact', () => {
        const component = new Component();
        const fooState = { foo: 'foo' };
        const barState = { bar: 'bar' };
        component.setState(fooState);
        component.setState(barState);
        expect(component.state.foo).toBe(fooState.foo);
        expect(component.state.bar).toBe(barState.bar);
    })
    test.each([
        ['string'],
        [10],
        [true],
        [false],
        [[]],
        [NaN],
        [Infinity],
        [undefined],
        [null],
    ])('throws when [state] param is not an object or function', (param) => {
        const component = new Component();
        expect(() => component.setState(param)).toThrow();
    })
})

