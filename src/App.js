import { Component, renderTemplate } from '@local/system';
import Logo from './common/Logo';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import Map from './map/Map';

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
            topbar: new Topbar(),
            sidebar: new Sidebar(),
            map: new Map(),
        });

        this.bind('selectedRegion', this.state.topbar, 'region');
        this.bind('selectedRegion', this.state.map, 'region');
    }

    view() {
        return renderTemplate(template, this.state);
    }

    cleanup() {
        super.cleanup();
        this.state.logo.cleanup();
        this.state.topbar.cleanup();
        this.state.sidebar.cleanup();
        this.state.map.cleanup();
    }
}
