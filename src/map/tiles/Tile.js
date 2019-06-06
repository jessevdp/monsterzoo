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