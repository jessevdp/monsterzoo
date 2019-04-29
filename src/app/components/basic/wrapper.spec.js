import { Component } from '@local/system'
import Wrapper from './wrapper';

describe('constructor', () => {
    it('stores all components in state', () => {
        const components = [new MockComponent(), new MockComponent(), new MockComponent()];
        const wrapper = new Wrapper(...components);
        expect(wrapper.state.components).toEqual(components);
    })
    test.each([
        [{ foo: 'bar' }],
        ['string'],
        [10],
        [false],
        [{}, new Component()]
    ])('only accepts instances of Component (%#)', (param) => {
        expect(() => new Wrapper(param)).toThrow();
    })
})

describe('render', () => {
    it('calls render on all components', () => {
        const components = [new MockComponent(), new MockComponent(), new MockComponent()];
        const wrapper = new Wrapper(...components);
        wrapper.render();
        components.forEach(component => expect(component.render).toHaveBeenCalled());
    })
    it('returns all components wrapped in a <div>', () => {
        const components = [new MockComponent('1'), new MockComponent('2'), new MockComponent('3')];
        const wrapper = new Wrapper(...components);
        const result = wrapper.render();
        expect(result).toBe('<div>123</div>');
    })
})

function MockComponent(view = '') {
    this.render = jest.fn(() => view);
    this.view = jest.fn(() => view);
}
MockComponent.prototype = Object.create(Component.prototype);
