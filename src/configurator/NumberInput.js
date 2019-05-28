import Input from './Input';
import { isNumber } from '@local/utilities';

export default class NumberInput extends Input {
    constructor (name, label, attributes = {}) {
        super(name, label, {...attributes, type: 'number'});
    }

    setAttributes(attributes) {
        const min = attributes.min;
        const max = attributes.max;
        if (isNumber(min) && min > this.value) this.value = min;
        if (isNumber(max) && max < this.value) this.value = max;
        super.setState(attributes);
    }

    set value(value) {
        const min = this.state.attributes.min;
        const max = this.state.attributes.max;
        if (isNumber(min) && value < min) value = min;
        if (isNumber(max) && value > max) value = max;
        super.value = value;
    }

    get value() {
        return Number(super.value);
    }
}