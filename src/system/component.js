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
        registerEventListeners(this);
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
     * Re-render the component to the DOM.
     * If the component has been rendered to the DOM before this method can be used to replace
     * the entire component with an updated version.
     * 
     * @returns {void}
     * @memberof Component
     */
    update() {
        const element = getDOMNode(this);
        const newElement = toDOMNode(this.render());
        if (element) element.replaceWith(newElement);
    }

    /**
     * Mutate the state of the component
     *
     * @param {(object|function)} state the subset of the state to be mutated, or a function that returns this subset
     * @returns {void}
     * @memberof Component
     */
    setState(state) {
        let newState;
        if (isObject(state)) newState = state;
        else if (isFunction(state)) newState = state(this.state);
        this.state = { ...this.state, ...newState };
        this.update();
    }

    /**
     * Register an event listener on the component
     *
     * @param {string} event a string representing the event-type to listen for
     * @param {string} [selector=undefined]
     * @param {function} handler
     * @returns {void}
     * @memberof Component
     */
    on(event, ...args) {
        const handler = args.pop();
        const selector = args.pop();
        const query = `[data-component-id="${this.id}"] ${selector ? selector : ''}`;
        const options = { capture: true, passive: true };

        document.addEventListener(event, (e) => {
            if (containsElement(query, e.target)) handler(e);
        }, options);
    }
}

/**
 * Check to if a query on the document contains a certain element.
 *
 * @param {string} query 
 * @param {HTMLElement} target
 * @returns {boolean}
 */
function containsElement(query, target) {
    const elements = document.querySelectorAll(query);
    let found = false;
    elements.forEach(element => {
        if (element.contains(target) || element === target) found = true;
    });
    return found;
}

function registerEventListeners(component) {
    if (isFunction(component.events)) component.events();
}

function getDOMNode(component) {
    return document.querySelectorAll(`[data-component-id="${component.id}"]`)[0];
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

function toDOMNode(view) {
    const wrapper = wrapHtmlString(view);
    return wrapper.children[0];
}
