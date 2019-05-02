import Wrapper from './components/basic/Wrapper';
import Title from './components/Title';

export default class App extends Wrapper {
    /**
     * Creates an instance of App.
     * @param {string} name
     * @memberof App
     */
    constructor(name) {
        let title = new Title(name);
        super(title);
        this._title = title;
    }

    /**
     * @param {string} value
     * @memberof App
     */
    set name(value) {
        this._title.content = value;
    }
}
