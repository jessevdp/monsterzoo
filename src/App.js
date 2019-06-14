import { Component, renderTemplate } from '@local/system';
import Logo from './common/Logo';
import Sidebar from './sidebar/Sidebar';
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
        this.state.logo.cleanup();
        this.state.sidebar.cleanup();
        this.state.map.cleanup();
    }
}
