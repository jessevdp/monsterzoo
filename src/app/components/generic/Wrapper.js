import { Component, renderTemplate } from '@local/system';

export default class Wrapper extends Component {
    /**
     * Creates an instance of Wrapper.
     * @param {array} components
     * @memberof Wrapper
     */
    constructor(...components) {
        super();
        this.setState({ components });
    }

    view() {
        const template = '<div>{{#components}}{{{.}}}{{/components}}</div>';
        return renderTemplate(template, this.state);
    }
}