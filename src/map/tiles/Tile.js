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
        this.on('dragover', e => this.monster || e.preventDefault()); // Make element a drop target, if there is no monster yet
        this.on('drop', e => {
            const i = e.dataTransfer.getData('monster');
            const monster = Registry.get(i);
            this.monster = monster;
        });
    }

    set monster(monster) {
        this.setState({ monster });
    }

    get monster() {
        return this.state.monster;
    }

    setState(state) {
        if (state.monster instanceof Monster) state.monster.tile = this;
        super.setState(state);
    }

    cleanup() {
        super.cleanup();
        if (this.state.monster instanceof Component) this.state.monster.cleanup();
    }
}