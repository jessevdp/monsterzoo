import { Component, renderTemplate } from '@local/system';
import './styles/Select.scss';

export default class Select extends Component {
    constructor(name, label, options = []) {
        super();
        this.setState({
            name,
            label,
            options,
            value: options[0],
        });
    }

    view() {
        const template = ''
            + '<div class="select bg-300">'
                + '<label class="text-secondary">{{label}}</label>'
                + `<select name="{{name}}"${this.isDisabled() ? ' disabled' : ''}>`
                    + '{{#options}}{{{.}}}{{/options}}'
                + '</select>'
                + '<svg class="icon" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7L9 0H0z" fill-rule="evenodd"></path></svg>'
            + '</div>';

        const options = this.state.options.map(option => {
            const selected = this.state.value === option ? ' selected' : '';
            return `<option value="${option}"${selected}>${option}</option>`;
        });

        return renderTemplate(template, {...this.state, options});
    }

    events() {
        this.on('change', 'select', () => {
            const $select = this.getHTMLElement('select');
            const isActive = document.activeElement === $select;
            this.setState({ value: $select.value });
            if (isActive) this.getHTMLElement('select').focus();
        });
    }

    isDisabled() {
        return this.state.options.length < 2;
    }


    set value(value) {
        this.setState(state => {
            if (state.options.includes(value)) return { value };
            else throw new RangeError(); 
        });
    }

    get value() {
        return this.state.value;
    }

    set options(options) {
        this.setState(state => {
            const value = options.includes(state.value) ? state.value : options[0];
            return { options, value };
        });
    }

    get options() {
        return this.state.options;
    }
}