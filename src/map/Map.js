import { Component, renderTemplate } from '@local/system';
import parseMap from './parseMap';

import template from './Map.template.html';
import './Map.scss';

export default class Map extends Component {
    constructor(rows) {
        super();
        this.setState({ rows });
    }

    static fromData(data) {
        const rows = parseMap(data);
        return new this(rows);
    }

    view() {
        const tiles = this.state.rows.reduce((all, row) => all.concat(row), []);
        return renderTemplate(template, { tiles, columns: this.state.rows[0].length });
    }

    cleanup() {
        super.cleanup();
        this.state.rows
            .reduce((all, row) => all.concat(row), [])
            .forEach(tile => tile.cleanup());
    }
}
