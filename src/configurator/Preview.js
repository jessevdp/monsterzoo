import { renderTemplate } from '@local/system';
import Monster from '@local/Monster';
import Tile from '@local/map/Tile';

import template from './Preview.template.html';
import './Preview.scss';

export default class Preview extends Tile {
    constructor(resetConfigurator) {
        super();
        this.resetConfigurator = resetConfigurator;
    }
 
    view() {
        return renderTemplate(template, this.state);
    }

    setState(state) {
        if (state.monster instanceof Monster) {
            super.placeMonster(state.monster);
        }
        else super.setState(state);
    }

    removeMonster() {
        super.removeMonster();
        this.resetConfigurator();
    }
}