import { Component } from '@local/system';
import config from '@local/config';
import './styles/Logo.scss';

export default class Logo extends Component {
    /**
     * Creates an instance of Logo.
     * @memberof Logo
     */
    constructor() {
        super();
        this.setState({ content: config.app.name });
    }

    view() {
        return `<div class="logo"><h2>${this.state.content}</h2></div>`;
    }
}