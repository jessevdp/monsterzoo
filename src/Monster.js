import { Component } from '@local/system';
import Tile from './map/tiles/Tile';
import Registry from './Registry';
import './Monster.scss';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
    }

    view() {
        return `<div class="monster ${this.state.skinColor}" draggable="true"></div>`;
    }

    events() {
        this.on('dragstart', e => {
            const index = Registry.add(this);
            e.dataTransfer.setData('monster', index);
        });
    }

    set tile(tile) {
        if (this._tile instanceof Tile) this._tile.monster = null;
        this._tile = tile;
    }

    get tile() {
        return this._tile;
    }
}