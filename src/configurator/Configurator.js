import { Component, renderTemplate } from '@local/system';
import { Input, NumberInput, Select } from '@local/components/form';
import options from './options';

import template from './Configurator.template.html';
import './styles/Configurator.scss';

export default class Configurator extends Component {
    constructor() {
        super();

        this.inputs = {
            name: new Input('name', 'Name'),
            type: new Select('type', 'Type', options.types),
            strength: new NumberInput('strenght', 'Strenght'),
            skinType: new Select('skintype', 'Skin type'),
            skinColor: new Select('skincolor', 'Skin color'),
            armType: new Select('armtype', 'Arm type'),
            arms: new NumberInput('arms', 'Amount of arms'),
            eyes: new NumberInput('eyes', 'Amount of eyes'),
            legs: new NumberInput('legs', 'Amount of legs'),
        };
        
        bindInputs(this);
        this.setState({ name: '', ...options.defaults });
        this.configureInputs();
    }

    view() {
        const inputs = Object.values(this.inputs);
        return renderTemplate(template, { inputs });
    }

    configureInputs() {
        this.inputs.strength.setAttributes(this.options.strength());
        this.inputs.skinType.options = this.options.skinTypes();
        this.inputs.skinColor.options = this.options.skinColors();
        this.inputs.armType.options = this.options.armTypes();
        this.inputs.arms.setAttributes(this.options.armCount());
        this.inputs.eyes.setAttributes(this.options.eyeCount());
        this.inputs.legs.setAttributes(this.options.legCount(this.state.arms));
    }

    setState(...args) {
        super.setState(...args);
        this.configureInputs();
    }

    get options() {
        return options.for(this.state.type);
    }

    cleanup() {
        super.cleanup();
        Object.values(this.inputs).forEach(input => input.cleanup());
    }
}

function bindInputs(configurator) {
    configurator.bind('name', configurator.inputs.name, 'value');
    configurator.bind('type', configurator.inputs.type, 'value');
    configurator.bind('strength', configurator.inputs.strength, 'value');
    configurator.bind('skinType', configurator.inputs.skinType, 'value');
    configurator.bind('skinColor', configurator.inputs.skinColor, 'value');
    configurator.bind('armType', configurator.inputs.armType, 'value');
    configurator.bind('arms', configurator.inputs.arms, 'value');
    configurator.bind('eyes', configurator.inputs.eyes, 'value');
    configurator.bind('legs', configurator.inputs.legs, 'value');
}