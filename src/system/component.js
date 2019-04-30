import uuid from 'uuid/v1';
import {
    isFunction,
    isString,
    isObject 
} from '@local/utilities';

export default class Component {
    /**
     * Creates an instance of Component.
     * @memberof Component
     */
    constructor() {
        this.id = uuid();
        this.state = {};
    }

    /**
     * Render the view of the component
     *
     * @returns {string} a string representation of the rendered view
     * @memberof Component
     */
    render() {
        verifyHasView(this);
        const view  = this.view();
        verifyView(view);
        return addComponentId(view, this.id);
    }

    /**
     * Mutate the state of the component
     *
     * @param {*} state the subset of the state to be mutated
     * @returns {void}
     * @memberof Component
     */
    setState(state) {
        let newState;
        if (isObject(state)) newState = state;
        else if (isFunction(state)) newState = state(this.state);
        else throw new Error('Invalid [state] param, expected an object or a function');
        this.state = { ...this.state, ...newState };
    }
}

function verifyHasView(component) {
    if (!isFunction(component.view)) {
        throw new Error('Component must implement a [view] function.');
    }
}

function verifyView(view) {
    if (!isString(view)) {
        throw new Error('Component [view] function must return a string.');
    }
    const wrapper = wrapHtmlString(view);
    if (wrapper.children.length !== 1) {
        throw new Error('Component [view] function must return exactly 1 root element');
    }
}

function addComponentId(view, id) {
    const wrapper = wrapHtmlString(view);
    const element = wrapper.children[0];
    element.setAttribute('data-component-id', id);
    return wrapper.innerHTML;
}

function wrapHtmlString(htmlString, element = 'div') {
    const wrapper = document.createElement(element);
    wrapper.innerHTML = htmlString;
    return wrapper;
}
