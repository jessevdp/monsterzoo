import { Component, renderTemplate } from '@local/system';
import Registry from '../../Registry';
import './Tile.scss';

export default class Tile extends Component {
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
        return renderTemplate(template, this.state);
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

    placeMonster(monster) {
        if (monster.tile) monster.tile.removeMonster();
        monster.tile = this;
        super.setState({ monster });
    }

    removeMonster() {
        const monster = this.state.monster;
        if (monster) monster.tile = null;
        this.setState({ monster: null });
    }

    cleanup() {
        super.cleanup();
        if (this.state.monster instanceof Component) this.state.monster.cleanup();
    }
}