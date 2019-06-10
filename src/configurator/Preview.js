import { Component, renderTemplate } from '@local/system';
import Tile from '@local/map/tiles/Tile';

import template from './Preview.template.html';
import './Preview.scss';

export default class Preview extends Tile {
    view() {
        return renderTemplate(template, this.state);
    }
}