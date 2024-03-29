import uuid from 'uuid/v1';
import Component from '../Component';
import { isObject } from '@local/utilities';

jest.mock('@local/system/renderTemplate');
jest.mock('uuid/v1', () => jest.fn(() => 'mock-id'));

document.addEventListener = jest.fn(document.addEventListener);

beforeEach(() => {
    document.body.innerHTML = '';
});

describe('constructor', () => {
    it('uses uuid to create an [id]', () => {
        const expected = 'mock component id';
        uuid.mockImplementationOnce(() => expected);
        const component = new Component();
        expect(uuid).toHaveBeenCalled();
        expect(component.id).toBe(expected);
        component.cleanup();
    })
    it('sets up a [state] object', () => {
        const component = new Component();
        expect(isObject(component.state)).toBeTruthy();
        component.cleanup();
    })
    it('calls the [events] function', () => {
        let called = false;
        class ExampleComponent extends Component {
            events() { called = true; }
        }
        const component = new ExampleComponent();
        expect(called).toBeTruthy();
        component.cleanup();
    })
})

describe('render', () => {
    it('calls the [view] function', () => {
        const component = new Component();
        component.view = jest.fn(() => '<div>rendered view string</div>');
        component.render();
        expect(component.view).toHaveBeenCalled();
        component.cleanup();
    })
    it('returns the [view] but adds the [id]', () => {
        const component = new Component();
        const view = '<div>view</div>';
        component.view = () => view;
        expect(component.render()).toBe(`<div data-component-id="${component.id}">view</div>`);
        component.cleanup();
    })
    it('throws if the [view] outputs more than 1 root element', () => {
        const component = new Component();
        component.view = jest.fn(() => '<div></div><div></div>');
        expect(() => component.render()).toThrow();
        component.cleanup();
    })
    it('throws if the [view] outputs no root element', () => {
        const component = new Component();
        component.view = jest.fn(() => 'just a string');
        expect(() => component.render()).toThrow();
        component.cleanup();
    })
    it('throws if no [view] function is defined', () => {
        const component = new Component();
        component.view = undefined;
        expect(() => component.render()).toThrow();
        component.cleanup();
    })
    it('throws if the [view] attribute is not a function', () => {
        const component = new Component();
        component.view = {};
        expect(() => component.render()).toThrow();
        component.cleanup();
    })
    it('throws if the [view] function does not return a string', () => {
        const component = new Component();
        component.view = () => {};
        expect(() => component.render()).toThrow();
        component.cleanup();
    })
})

describe('setState', () => {
    it('accepts an object to update the state', () => {
        const component = new MockComponent();
        const state = { foo: 'bar' };
        component.setState(state);
        expect(component.state).toEqual(state);
        component.cleanup();
    })
    it('accepts a function to update the state', () => {
        const component = new MockComponent();
        const state = { foo: 'bar' };
        component.setState(() => state);
        expect(component.state).toEqual(state);
        component.cleanup();
    })
    it('passes the old state to the passed function', () => {
        // Arrange
        const component = new MockComponent();
        const oldState = { foo: 'foo' };
        const newState = { foo: 'bar' };
        component.setState(oldState);
        const fn = jest.fn(() => newState);

        // Act
        component.setState(fn);
        
        // Assert
        expect(fn).toHaveBeenCalledWith(oldState);

        component.cleanup();
    })
    it('overwrites old values', () => {
        // Arrange
        const component = new MockComponent();
        const oldState = { foo: 'foo' };
        const newState = { foo: 'bar' };
        component.setState(oldState);

        // Act
        component.setState(newState);
        
        // Assert
        expect(component.state).toEqual(newState);

        component.cleanup();
    })
    it('leaves other values intact', () => {
        const component = new MockComponent();
        const fooState = { foo: 'foo' };
        const barState = { bar: 'bar' };
        component.setState(fooState);
        component.setState(barState);
        expect(component.state.foo).toBe(fooState.foo);
        expect(component.state.bar).toBe(barState.bar);
        component.cleanup();
    })
    it('calls the [update] method', () => {
        const component = new MockComponent();
        component.update = jest.fn();
        component.setState({ foo: 'foo' });
        expect(component.update).toHaveBeenCalled();
        component.cleanup();
    })
})

describe('update', () => {
    it('replaces the component in the DOM', () => {
        const component = new MockComponent();
        component.view = () => `<div>initial</div>`;
        document.body.innerHTML = component.render();
        component.view = () => `<div>updated</div>`;
        component.update();
        const element = document.querySelectorAll(`[data-component-id="${component.id}"]`)[0];
        expect(element.textContent).toBe('updated');
        component.cleanup();
    })
    it('calls the [render] function', () => {
        const component = new MockComponent('<div></div>');
        document.body.innerHTML = component.render();
        component.update();
        expect(component.render).toHaveBeenCalled();
        component.cleanup();
    })
})

describe('on', () => {
    it('adds an event listener to the document', () => {
        const event = 'click';
        const handler = () => {};
        const options = { capture: true };
        const component = new Component();
        component.on(event, handler);
        expect(document.addEventListener).toHaveBeenCalledWith(event, expect.any(Function), options)
        component.cleanup();
    })
    test('when the registered event is emitted on the element itself, the listeners is called', () => {
        const component = new MockComponent();
        const handler = jest.fn();
        component.on('click', handler);
        document.body.innerHTML = component.render();
        const element = document.querySelector(`[data-component-id="${component.id}"]`);
        element.dispatchEvent(new Event('click'));
        expect(handler).toHaveBeenCalledWith(expect.any(Object));
        component.cleanup();
    })
    test('when the event is emitted on a child element, the listener is called', () => {
        const id = 'child';
        const component = new MockComponent(`<div><span id="${id}"></span></div>`);
        const handler = jest.fn();
        component.on('click', handler);
        document.body.innerHTML = component.render();
        const child = document.getElementById(id);
        child.dispatchEvent(new Event('click'));
        expect(handler).toHaveBeenCalledWith(expect.any(Object));
        component.cleanup();
    })
    test('when a different event is emitted, the listener is NOT called', () => {
        const component = new MockComponent();
        const handler = jest.fn();
        component.on('click', handler);
        document.body.innerHTML = component.render();
        const element = document.querySelector(`[data-component-id="${component.id}"]`);
        element.dispatchEvent(new Event('mouseover'));
        expect(handler).not.toHaveBeenCalled();
        component.cleanup();
    })
    test('when the event is emitted on a different element, the listener is NOT called', () => {
        const component = new MockComponent();
        component.id = 1;
        const otherComponent = new MockComponent();
        otherComponent.id = 2;
        const handler = jest.fn();
        component.on('click', handler);
        document.body.innerHTML = component.render() + otherComponent.render();
        const element = document.querySelector(`[data-component-id="${otherComponent.id}"]`);
        element.dispatchEvent(new Event('click'));
        expect(handler).not.toHaveBeenCalled();
        component.cleanup();
        otherComponent.cleanup();
    })
})

describe('getHTMLElement', () => {
    it('returns the HTMLElement if the component is rendered to the document', () => {
        const component = new MockComponent();
        document.body.innerHTML = component.render();
        const el = document.body.firstChild;
        expect(component.getHTMLElement()).toBe(el);
        component.cleanup();
    })
    it('returns [null] if the component is not rendered to the document', () => {
        const component = new MockComponent();
        expect(component.getHTMLElement()).toBe(null);
        component.cleanup();
    })
    it('accepts a [query] parameter to select a sub-element of the component', () => {
        const component = new MockComponent('<div><h1 id="foo">bar</h1></div>');
        document.body.innerHTML = component.render();
        const expected = document.getElementById('foo');
        expect(component.getHTMLElement('#foo')).toBe(expected);
        component.cleanup();
    })
    it('returns [null] if the [query] does not match any sub-elements', () => {
        const component = new MockComponent('<div><h1 id="foo">bar</h1></div>');
        document.body.innerHTML = component.render();
        expect(component.getHTMLElement('#bar')).toBe(null);
        component.cleanup();
    })
})

describe('bind', () => {
    describe('when the property on the components\' state changes', () => {
        it('updates the value on the linked components state', () => {
            const value = 'foo';
            const component = new Component();
            const otherComponent = new Component();
            component.bind('property', otherComponent);
            component.setState({ property: value });
            expect(otherComponent.state.property).toBe(value);
            component.cleanup();
            otherComponent.cleanup();
        })
    })
    describe('when the property on the linked components\' state changes', () => {
        it('updates the value on the initial components state', () => {
            const value = 'foo';
            const component = new Component();
            const otherComponent = new Component();
            component.bind('property', otherComponent);
            otherComponent.setState({ property: value });
            expect(component.state.property).toBe(value);
            component.cleanup();
            otherComponent.cleanup();
        })
    })
    it('accepts an optional parameter to specify the name of the property on the source component', () => {
        const value = 'foo';
        const component = new Component();
        const otherComponent = new Component();
        component.bind('property', otherComponent, 'otherProperty');
        component.setState({ property: value });
        expect(otherComponent.state.otherProperty).toBe(value);
        component.cleanup();
        otherComponent.cleanup();
    })
})

function MockComponent(view = '<div></div>') {
    let _this = new Component();
    _this.render = jest.fn(Component.prototype.render);
    _this.view = jest.fn(() => view);
    return _this;
}
MockComponent.prototype = Object.create(Component.prototype);
