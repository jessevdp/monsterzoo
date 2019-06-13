import { Component, renderTemplate } from '@local/system';
import Configurator from '@local/sidebar/Configurator';
import Bin from '@local/sidebar/Bin';

import './styles/Sidebar.scss';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.setState({
            configurator: new Configurator(),
            bin: new Bin(),
        });
    }

    view() {
        const template = ''
            + '<div class="sidebar">'
                + '{{{ configurator }}}'
                + '{{{ bin }}}'
            + '</div>';
        return renderTemplate(template, this.state);
    }

    cleanup() {
        super.cleanup();
        this.state.configurator.cleanup();
        this.state.bin.cleanup();
    }
}