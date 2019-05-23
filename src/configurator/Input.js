import { Component } from '@local/system';
import { isObject, isFunction } from '@local/utilities';

const defaultAttributes = {
    'type': 'text'
};

export default class Input extends Component {
    /**
     * Creates an instance of Input.
     * @param {string} name
     * @param {object} [attributes={}] A set of attributes for the input box, represented as key-value pairs
     * @memberof Input
     */
    constructor(name, attributes = {}) {
        super();
        attributes = {...defaultAttributes, ...attributes};
        this.setState({
            name,
            attributes
        });
    }

    view() {
        return `<input name="${this.state.name}" ${this.htmlAttributes()} />`;
    }

    /**
     * Mutate the attributes of the Input.
     *
     * @param {(object|function)} attributes The subset of attributes to be mutated, or a function that returns this subset.
     * @returns {void}
     * @memberof Input
     */
    setAttributes(attributes) {
        this.setState(state => {
            let newAttributes;
            if (isObject(attributes)) newAttributes = attributes;
            if (isFunction(attributes)) newAttributes = attributes(state.attributes);
            return {
                attributes: {
                    ...state.attributes,
                    ...newAttributes,
                }
            };
        });
    }

    /**
     * Convert the attributes object (stored in state) into it's HTML string
     * equivalent. (E.g. a sequence of: 'key="value"')
     *
     * @returns {string}
     * @memberof Input
     */
    htmlAttributes() {
        return Object.entries(this.state.attributes)
            .map((entry) => `${entry[0]}="${entry[1]}"`)
            .reduce((all, attribute) => all + (attribute + ' '), '')
            .trim();
    }
}