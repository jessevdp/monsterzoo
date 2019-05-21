import { Component } from '@local/system';
import './styles/Logo.scss';

export default class Logo extends Component {
    /**
     * Creates an instance of Logo.
     * @param {string} content
     * @memberof Logo
     */
    constructor(content) {
        super();
        this.setState({ content });
    }

    view() {
        return `<div class="logo"><h2>${this.state.content}</h2></div>`;
    }
}