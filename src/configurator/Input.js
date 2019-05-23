import { Component } from '@local/system';

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
}