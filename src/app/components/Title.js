import { Component, renderTemplate } from '@local/system';

import template from './Title.template.html';
import './Title.scss';

export default class Title extends Component {
    /**
     *Creates an instance of Title.
     * @param {string} [content=''] the text-content of the title
     * @memberof Title
     */
    constructor(content = '') {
        super();
        this.setState({ content });
    }

    view() {
        return renderTemplate(template, this.state);
    }

    events() {
        this.on('click', () => {
            alert('You clicked on title: ' + this.state.content);
        });
    }

    /**
     * @param {string} value
     * @memberof Title
     */
    set content(value) {
        this.setState({ content: value });
    }
}
