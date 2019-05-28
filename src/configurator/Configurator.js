import { Component, renderTemplate } from '@local/system';
import Input from './Input';
import Select from './Select';

import template from './Configurator.template.html';
import './styles/Configurator.scss';

export default class Configurator extends Component {
    constructor() {
        super();

        this.inputs = {
            name: new Input('name', 'Name'),
            type: new Select('type', 'Type', ['water', 'fire', 'earth', 'wind']),
            strength: new Input('strenght', 'Strenght', { type: 'number', min: 0, max: 10, step: 1 }),
            skintype: new Select('skintype', 'Skin type', ['scales', 'slime']),
            skincolor: new Select('skincolor', 'Skin color', ['blue', 'red', 'green']),
            armtype: new Select('armtype', 'Arm type', ['tentacles', 'fins']),
            arms: new Input('arms', 'Amount of arms', { type: 'number', min: 0, max: 8, step: 1 }),
            eyes: new Input('eyes', 'Amount of eyes', { type: 'number', min: 0, max: 8, step: 1 }),
            legs: new Input('legs', 'Amount of legs', { type: 'number', min: 0, max: 4, step: 1 }),
        }
    }

    view() {
        const inputs = Object.values(this.inputs);
        return renderTemplate(template, { inputs });
    }

    cleanup() {
        super.cleanup();
        Object.values(this.inputs).forEach(input => input.cleanup());
    }
}