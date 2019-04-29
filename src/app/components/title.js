import { Component, renderTemplate } from '@local/system';
import { isString } from '@local/utilities';

import template from './Title.template.html';
import './Title.scss';

export default class Title extends Component {
    /**
     * Creates an instance of Title.
     * @param {string} content the text-content of the title
     * @memberof Title
     */
    constructor(content) {
        super();
        if (isString(content)) this.setState({ content });
        else throw new Error('Invalid [content] parameter, expected a string.');
    }

    view() {
        return renderTemplate(template, this.state);
    }
}