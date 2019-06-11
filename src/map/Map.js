import { Component, renderTemplate } from '@local/system';
import Tile from './Tile';
import Obstacle from './Obstacle';
import Monster from '../Monster';

import template from './Map.template.html';
import './Map.scss';

export default class Map extends Component {
    constructor(rows) {
        super();
        this.setState({ rows });
    }

    static fromData(data) {
        const rows = data.map(row => {
            return row.map(tile => createTile(tile));
        });
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

function createTile(object) {
    if (object.class === 'Tile') {
        const tile = new Tile();
        if (object.monster) tile.placeMonster(new Monster(object.monster));
        return tile;
    }
    else if (object.class === 'Obstacle') return new Obstacle();
}