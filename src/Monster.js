import { Component } from '@local/system';
import Registry from './Registry';
import './Monster.scss';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
    }

    view() {
        return `<div class="monster ${this.state.skinColor}" draggable="true"><div></div></div>`;
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