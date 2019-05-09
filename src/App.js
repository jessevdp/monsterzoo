import { Component } from '@local/system';

export default class App extends Component {
    /**
     * Creates an instance of App.
     * @param {string} name
     * @memberof App
     */
    constructor(name) {
        super();
        this.setState({ name: name });
    }

    view() {
        return `<div></div>`;
    }

    /**
     * @param {string} value
     */
    set name(value) {
        this.setState({ name: value });
    }

    effects(useEffect) {
        useEffect(() => document.title = this.state.name);
    }
}
