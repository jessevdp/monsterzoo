import { Component, renderTemplate } from '@local/system';
import Logo from '@local/layout/Logo';
import config from '@local/config';
import template from './App.template.html';
import './App.scss';

export default class App extends Component {
    /**
     * Creates an instance of App.
     * @memberof App
     */
    constructor() {
        super();
        this.setState({ name: config.app.name });
    }

    view() {
        const logo = new Logo(this.state.name);
        return renderTemplate(template, { logo });
    }
}
