import { Component, renderTemplate } from '@local/system';

export default class Wrapper extends Component {
    /**
     * Creates an instance of Wrapper.
     * @param {Component[]} components
     * @memberof Wrapper
     */
    constructor(...components) {
        super();
        components.forEach(component => {
            if (!(component instanceof Component)) throw new Error('Wrapper expects only instances of Component');
        });
        this.setState({ components });
    }

    view() {
        const template = '<div>{{#components}}{{.}}{{/components}}</div>';
        return renderTemplate(template, this.state);
    }
}