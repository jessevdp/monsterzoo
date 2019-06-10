import { Component, renderTemplate } from '@local/system';
import Monster from '@local/Monster';
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
        this.on('dragover', e => e.preventDefault()); // Make element a drop target
        this.on('drop', '.tile--placeholder', e => {
            const i = e.dataTransfer.getData('monster');
            const monster = Registry.get(i);
            this.monster = monster;
        });
    }

    set monster(monster) {
        this.setState({ monster });
        if (monster instanceof Monster) monster.tile = this;
    }

    get monster() {
        return this.state.monster;
    }

    cleanup() {
        super.cleanup();
        if (this.state.monster instanceof Component) this.state.monster.cleanup();
    }
}