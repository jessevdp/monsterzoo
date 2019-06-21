import { Component, renderTemplate } from '@local/system';
import RegionSelector from './RegionSelector';

import './styles/Topbar.scss';

export default class Topbar extends Component {
    constructor() {
        super();
        this.regionSelector = new RegionSelector();
        this.bind('region', this.regionSelector);
    }

    view() {
        const template = '<div class="topbar">{{{ region }}}</div>';
        return renderTemplate(template, { region: this.regionSelector });
    }

    cleanup() {
        super.cleanup();
        this.regionSelector.cleanup();
    }
}