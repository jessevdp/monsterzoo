import { Component, renderTemplate } from '@local/system';

import template from './Preview.template.html';
import './Preview.scss';

export default class Preview extends Component {
    view() {
        return renderTemplate(template, this.state);
    }
}