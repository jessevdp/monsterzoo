import uuid from 'uuid/v1';
import {
    isFunction,
    isString,
    isObject,
    isArray,
    arrayEquals,
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
        this._observer = registerDOMMutationObserver(this);
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
        const element = this.getHTMLElement();
        if (element) {
            const newElement = toDOMNode(this.render());
            element.replaceWith(newElement);
        }
    }

    afterDOMUpdate() {
        refreshEffects(this);
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
        runBindings(this, newState);
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
        const options = { capture: true };
        const listener = e => {
            if (containsElement(query, e.target)) handler(e);
        };
        document.addEventListener(event, listener, options);

        if (!isArray(this._listeners)) this._listeners = [];
        this._listeners.push({ event, listener, options });
    }

    /**
     * Setup two-way data binding beteween a property on the components' state
     * and a property on another component's state.
     *
     * @param {string} property
     * @param {Component} otherComponent
     * @param {string} [otherProperty=property]
     * @returns {void}
     * @memberof Component
     */
    bind(property, otherComponent, otherProperty = property) {
        setupOneWayDataBinding(this, property, otherComponent, otherProperty);
        setupOneWayDataBinding(otherComponent, otherProperty, this, property);
        if (this.state[property]) {
            otherComponent.setState({ [otherProperty]: this.state[property] });
        }
        else if (otherComponent.state[otherProperty]) {
            this.setState({ [property]: otherComponent.state[otherProperty] });
        }
    }

    /**
     * Get the HTMLElement for the component by querying the document for an element with the
     * id of the component.
     *
     * @param {string} [query]
     * @returns {(HTMLElement|null)} Returns the first element with the same component id. Or null if not found.
     * @memberof Component
     */
    getHTMLElement(query) {
        query = query ? ' ' + query : '';
        return document.querySelector(`[data-component-id="${this.id}"]` + query);
    }

    /**
     * Clean up any side effects that the Component has created
     * 
     * @returns {void}
     * @memberof Component
     */
    cleanup() {
        this._observer.disconnect();
        removeEventListeners(this);
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
        if (element.contains(target)) found = true;
    });
    return found;
}

/**
 * Create a MutationObserver that calls Component.afterDOMUpdate when the
 * mounted DOM representation of the component, or any of it's sub-nodes
 * are updated.
 * 
 * @returns {void}
 * @param {Component} component
 */
function registerDOMMutationObserver(component) {
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(mutations => {
        const $component = component.getHTMLElement();
        const wasUpdated = mutations
            .map(mutation => mutation.addedNodes)
            .map(nodeList => [...nodeList])
            .reduce((nodes, subset) => nodes.concat(subset), [])
            .map(node => node.contains($component))
            .reduce((matched, matches) => matched || matches, false);
        if (wasUpdated) component.afterDOMUpdate();
    });
    observer.observe(document, config);
    return observer;
}

function refreshEffects(component) {
    if (!isFunction(component.effects)) return;
    if (!isArray(component._effects)) component._effects = [];

    const effects = [];

    function useEffect(effect, dependencies = null) {
        const oldEffect = component._effects.filter(e => e.id === effect.toString()).shift();
        if (isObject(oldEffect)) {
            if (
                isArray(dependencies)
                && isArray(oldEffect.dependencies)
                && arrayEquals(dependencies, oldEffect.dependencies)
            ) {
                effects.push(oldEffect);
                return;
            }
            if (isFunction(oldEffect.cleanup)) oldEffect.cleanup();
        }
        effects.push({
            id: effect.toString(),
            cleanup: effect(),
            dependencies: dependencies,
        });
    }

    component.effects(useEffect);
    component._effects = effects;
}

function registerEventListeners(component) {
    if (isFunction(component.events)) component.events();
}

function removeEventListeners(component) {
    if (isArray(component._listeners)) component._listeners.forEach(l => document.removeEventListener(l.event, l.listener, l.options));
}

function setupOneWayDataBinding(component, property, otherComponent, otherProperty) {
    if (!component._bindings) component._bindings = [];
    function handler (newState) {
        if (!newState.hasOwnProperty(property)) return;
        if (otherComponent.state[otherProperty] === newState[property]) return;
        otherComponent.setState({ 
            [otherProperty]: newState[property] 
        });
    }
    component._bindings.push(handler);
}

function runBindings(component, newState) {
    if (! isArray(component._bindings)) return;
    component._bindings.forEach(handle => handle(newState));
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
