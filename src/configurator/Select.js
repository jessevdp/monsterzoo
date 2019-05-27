import { Component, renderTemplate } from '@local/system';

export default class Select extends Component {
    constructor(name, label, options) {
        super();
        this.setState({
            name,
            label,
            options,
        });
    }

    view() {
        const template = ''
            + '<div class="select">'
                + '<label>{{label}}</label>'
                + '<select name="{{name}}">'
                    + '<option value="" disabled selected>Select an option</option>'
                    + '{{#options}}'
                        + '{{{.}}}'
                    + '{{/options}}'
                + '</select>'
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


    set value(value) {
        this.setState({ value });
    }

    get value() {
        return this.state.value;
    }

    set options(options) {
        this.setState({ options });
    }

    get options() {
        return this.state.options;
    }
}