import { Component, renderTemplate, EventBus } from '@local/system';
import { isArray } from '@local/utilities';
import CentralStore from '@local/common/CentralStore';

import MapStorage from './MapStorage';
import parseMap from './parseMap';

import template from './Map.template.html';
import './Map.scss';

export default class Map extends Component {
    constructor() {
        super();
        this.bind('region', CentralStore);
        this.load();
    }

    view() {
        const tiles = this.state.rows.reduce((all, row) => all.concat(row), []);
        return renderTemplate(template, { tiles, columns: this.state.rows[0].length });
    }

    events() {
        EventBus.on('monster-moved', () => this.store());
    }

    store() {
        if (isArray(this.state.rows)) MapStorage.put(this.state.region, this.state.rows);
    }

    load() {
        const data = MapStorage.get(this.state.region);
        const rows = parseMap(data);
        cleanUpTiles(this);
        this.setState({ rows });
    }

    setState(state) {
        super.setState(state);
        if (state.region) {
            this.load();
        }
    }

    cleanup() {
        super.cleanup();
        cleanUpTiles(this);
    }
}

function cleanUpTiles(map) {
    if (isArray(map.state.rows)) {
        map.state.rows
            .reduce((all, row) => all.concat(row), [])
            .forEach(tile => tile.cleanup());
    }
}
