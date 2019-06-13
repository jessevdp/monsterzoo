import { Component, renderTemplate } from '@local/system';
import Logo from './layout/Logo';
import Sidebar from './layout/Sidebar';
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
        this.setState({
            logo: new Logo(),
            sidebar: new Sidebar(),
            map: Map.fromData(initialMapData),
        });
    }

    view() {
        return renderTemplate(template, this.state);
    }

    cleanup() {
        super.cleanup();
        this.logo.cleanup();
        this.configurator.cleanup();
        this.map.cleanup();
    }
}
