import { Component } from '@local/system';
import './Monster.scss';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
    }
    view() {
        return `<div class="monster ${this.state.skinColor}"></div>`;
    }
}