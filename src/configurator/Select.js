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
                    + '{{#options}}'
                        + '<option value="{{.}}">{{.}}</option>'
                    + '{{/options}}'
                + '</select>'
            + '</div>';
        return renderTemplate(template, this.state);
    }

    set options(options) {
        this.setState({ options });
    }

    get options() {
        return this.state.options;
    }
}