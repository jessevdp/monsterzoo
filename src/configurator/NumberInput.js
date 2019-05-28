import Input from './Input';

export default class NumberInput extends Input {
    constructor (name, label, attributes = {}) {
        super(name, label, {...attributes, type: 'number'});
    }
}