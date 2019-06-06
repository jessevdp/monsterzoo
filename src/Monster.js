import { Component } from '@local/system';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
    }
    view() {
        return '<div class="monster"></div>';
    }
}