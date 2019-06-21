import { isArray } from '@local/utilities/';

export default class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to a certain event with a handler
     *
     * @param {string} event
     * @param {function} handler
     * @returns {void}
     */
    on(event, handler) {
        if (!isArray(this.events[event])) this.events[event] = [];
        this.events[event].push(handler);
    }

    /**
     * Unsubscribe a handler form a certain event
     *
     * @param {string} event
     * @param {function} handler
     * @returns {void}
     */
    remove(event, handler) {
        if (!isArray(this.events[event])) return;
        const index = this.events[event].indexOf(handler);
        if (index > -1) this.events[event].splice(index, 1);
        if (this.events[event].length <= 0) delete this.events[event];
    }

    /**
     * Emit an event, passing optional data to every listener/handler.
     *
     * @param {string} event
     * @param {*} [args]
     * @returns {void}
     */
    emit(event, ...args) {
        if (!isArray(this.events[event])) return;
        this.events[event].forEach(handler => handler(...args));
    }
}