import { Component, renderTemplate } from '@local/system';
import { Input, NumberInput, Select } from '@local/components/form';
import { excludeProperties } from '@local/utilities';
import Monster from '@local/Monster';

import options from './options';
import template from './Configurator.template.html';
import './Configurator.scss';

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

    setState(state) {
        if (state.monster instanceof Monster) {
            const attributes = state.monster.state;
            state = { ...state, ...attributes };
            super.setState(state);
        }
        else {
            super.setState(state);
            let monster = this.monster;
            super.setState({ monster });
        }
        this.configureInputs();
    }

    get monster() {
        let monster = null;
        if (this.isComplete()) {
            const attributes = excludeProperties(['monster'], this.state);
            monster = this.state.monster || new Monster();
            monster.setState(attributes);
        }
        return monster;
    }

    get options() {
        return options.for(this.state.type);
    }

    isComplete() {
        return !!this.state.name;
    }

    cleanup() {
        super.cleanup();
        Object.values(this.inputs).forEach(input => input.cleanup());
        if (this.state.monster) this.state.monster.cleanup();
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
