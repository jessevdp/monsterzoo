import { Component, renderTemplate } from '@local/system';
import Configurator from '@local/configurator/Configurator';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.setState({
            configurator: new Configurator(),
        });
    }

    view() {
        const template = '<div class="sidebar">{{{ configurator }}}</div>';
        return renderTemplate(template, this.state);
    }

    cleanup() {
        super.cleanup();
        this.state.configurator.cleanup();
    }
}