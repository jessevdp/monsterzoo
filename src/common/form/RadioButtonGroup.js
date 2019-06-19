import { renderTemplate } from '@local/system';
import Select from './Select';

import './styles/RadioButtonGroup.scss';

export default class RadioButtonGroup extends Select {
    constructor(name, options = []) {
        super(name, undefined, options);
    }

    view() {
        const template = ''
            + '<div class="radio-button-group">'
                + '{{#options}}{{{ . }}}{{/options}}'
            + '</div>';
        const options = this.state.options.map(option => {
            const selected = this.state.value === option ? ' selected' : '';
            return `<button class="radio-button-group__button${selected}" data-option="${option}">${option}</button>`;
        });
        return renderTemplate(template, { ...this.state, options });
    }

    events() {
        this.on('click', '.radio-button-group__button', e => {
            this.value = e.target.dataset.option;
        });
    }
}