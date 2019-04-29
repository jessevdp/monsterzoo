import { Component } from '@local/system';

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
        return `<div> ${this.renderChildren()} </div>`;
    }

    renderChildren() {
        return this.state.components
            .map(component => component.render())
            .reduce((all, child) => all + child);
    }
}