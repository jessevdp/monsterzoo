import { renderTemplate } from '@local/system';
import Registry from '@local/common/Registry';
import BaseTile from './BaseTile';
import './Tile.scss';

export default class Tile extends BaseTile {
    /**
     * Creates an instance of Tile.
     * @param {Monster} [monster=null]
     * @memberof Tile
     */
    constructor(monster=null) {
        super();
        this.setState({ monster });
    }

    view() {
        const template = ''
            + '<div class="tile">'
                + '<div class="tile--content">'
                    + '{{#monster}}{{{ . }}}{{/monster}}'
                    + '{{^monster}}<div class="tile--placeholder"></div>{{/monster}}'
                + '</div>'
            + '</div>';
        return renderTemplate(template, { monster: this.state.monster });
    }

    events() {
        this.on('dragenter', '.tile--placeholder', () => this.getHTMLElement().classList.add('hover'));
        this.on('dragleave', '.tile--placeholder', () => this.getHTMLElement().classList.remove('hover'));
        this.on('dragover', e => this.state.monster || e.preventDefault()); // Make element a drop target, if there is no monster yet
        this.on('drop', e => {
            const i = e.dataTransfer.getData('monster');
            const monster = Registry.get(i);
            this.placeMonster(monster);
        });
    }

    placeMonster(monster, alertMonster = true) {
        if (monster.tile) monster.tile.removeMonster();
        monster.tile = this;
        super.setState({ monster });
        if (alertMonster) monster.moved();
        this.notifyNeighbors();
    }

    removeMonster() {
        const monster = this.state.monster;
        if (monster) monster.tile = null;
        this.setState({ monster: null });
    }

    notify() {
        if (this.state.monster) this.state.monster.notify();
    }

    notifyNeighbors() {
        if (this.north) this.north.notify();
        if (this.east) this.east.notify();
        if (this.south) this.south.notify();
        if (this.west) this.west.notify();
    }

    cleanup() {
        super.cleanup();
        if (this.state.monster) this.state.monster.cleanup();
    }
}