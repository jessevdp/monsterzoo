import { Component, renderTemplate } from '@local/system';
import Registry from './Registry';
import './Monster.scss';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
    }

    view() {
        const template = ''
            + '<div class="monster {{color}}" draggable="true">'
                + '<div class="monster--internal"></div>'
            + '</div>';
        return renderTemplate(template, { color: this.state.skinColor });
    }

    events() {
        this.on('dragstart', e => {
            const index = Registry.add(this);
            e.dataTransfer.setData('monster', index);
        });

        this.on('dragstart', () => this.getHTMLElement().classList.add('dragged'));
        this.on('dragend', () => this.getHTMLElement().classList.remove('dragged'));
    }
}