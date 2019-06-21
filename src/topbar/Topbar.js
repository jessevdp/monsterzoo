import { Component, renderTemplate } from '@local/system';
import RegionSelector from './RegionSelector';
import Weather from './Weather';

import './styles/Topbar.scss';

export default class Topbar extends Component {
    constructor() {
        super();
        this.regionSelector = new RegionSelector();
        this.weather = new Weather();
        this.bind('region', this.regionSelector);
        this.bind('region', this.weather);
    }

    view() {
        const template = ''
        + '<div class="topbar">'
            + '{{{ weather }}}'
            + '{{{ region }}}'
        + '</div>';
        return renderTemplate(template, {
            region: this.regionSelector,
            weather: this.weather,
        });
    }

    cleanup() {
        super.cleanup();
        this.regionSelector.cleanup();
        this.weather.cleanup();
    }
}