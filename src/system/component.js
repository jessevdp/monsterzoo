import { isFunction, isString } from '@local/utilities';

export default class Component {
    /**
     *Creates an instance of Component.
     * @memberof Component
     */
    constructor() {
        this.state = {};
    }

    /**
     * Render the view of the component
     *
     * @returns {string} a string representation of the rendered view
     * @memberof Component
     */
    render() {
        if (!isFunction(this.view)) throw new Error('Component must implement a [view] function.');
        const view  = this.view();
        if (!isString(view)) throw new Error('Component [view] function must return a string.');
        return view;
    }
}
