import { Component } from '@local/system';
import { isObject } from '@local/utilities';

jest.mock('@local/utilities/template');

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

