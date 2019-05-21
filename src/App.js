import { Component, renderTemplate } from '@local/system';
import Logo from '@local/layout/Logo';
import template from './App.template.html';
import './App.scss';

export default class App extends Component {
    /**
     * Creates an instance of App.
     * @memberof App
     */
    constructor() {
        super();
        this.logo = new Logo();
    }

    view() {
        return renderTemplate(template, { logo: this.logo });
    }

    cleanup() {
        super.cleanup();
        this.logo.cleanup();
    }
}
