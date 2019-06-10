import { Component, renderTemplate } from '@local/system';
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
    }

    set monster(monster) {
        this.setState({ monster });
    }

    get monster() {
        return this.state.monster;
    }

    cleanup() {
        super.cleanup();
        if (this.state.monster instanceof Component) this.state.monster.cleanup();
    }
}