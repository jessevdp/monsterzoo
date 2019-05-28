import { Component, renderTemplate } from '@local/system';
import template from './Configurator.template.html';
import './styles/Configurator.scss';

export default class Configurator extends Component {
    view() {
        return renderTemplate(template);
    }
}