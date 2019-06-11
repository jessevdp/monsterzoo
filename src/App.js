import { Component, renderTemplate } from '@local/system';
import Logo from './layout/Logo';
import Configurator from './configurator/Configurator';
import Map from './map/Map';
import initialMapData from './map/initial-map.json';

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
        this.map = Map.fromData(initialMapData);
    }

    view() {
        return renderTemplate(template, { logo: this.logo, configurator: this.configurator, map: this.map });
    }

    cleanup() {
        super.cleanup();
        this.logo.cleanup();
        this.configurator.cleanup();
        this.map.cleanup();
    }
}
