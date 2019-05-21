import { Component, renderTemplate } from '@local/system';
import template from './App.template.html';
import './App.scss';

export default class App extends Component {
    view() {
        return renderTemplate(template);
    }
}
