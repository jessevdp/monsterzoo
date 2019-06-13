import { renderTemplate } from '@local/system';
import Tile from '@local/map/Tile';

import template from './templates/SidebarTile.template.html';
import './styles/SidebarTile.scss';

export default class SidebarTile extends Tile { 
    /**
     * Creates an instance of SidebarTile.
     * @memberof SidebarTile
     * @param {string} title
     * @param {string} description
     */
    constructor(title, description) {
        super();
        this.setState({
            title,
            description,
        });
    }

    view() {
        return renderTemplate(template, this.state);
    }
}