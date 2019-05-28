import { Component, renderTemplate } from '@local/system';
import Logo from './layout/Logo';
import Configurator from './configurator/Configurator';

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
        this.configurator = new Configurator();
    }

    view() {
        return renderTemplate(template, { logo: this.logo, configurator: this.configurator });
    }

    cleanup() {
        super.cleanup();
        this.logo.cleanup();
        this.configurator.cleanup();
    }
}
