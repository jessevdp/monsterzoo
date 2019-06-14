class Registry {
    constructor() {
        this.registry = [];
    }

    /**
     * Store a value in the registry
     * @param {*} value
     * @returns {number} The index at which the value has been stored
     */
    add(value) {
        const index = this.registry.length;
        this.registry[index] = value;
        return index;
    }

    /**
     * Get a value from the registry
     *
     * @param {number} index
     * @returns {void}
     * @memberof Registry
     */
    get(index) {
        return this.registry[index];
    }
}

export default new Registry();