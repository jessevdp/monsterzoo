import Wrapper from './components/basic/Wrapper';
import Title from './components/Title';
import { isString } from '@local/utilities';

export default class App extends Wrapper {
    /**
     * Creates an instance of App.
     * @param {string} name
     * @memberof App
     */
    constructor(name) {
        if (!isString(name)) throw new Error('Invalid argument [name], expected a string.');
        super(
            new Title(name),
        );
    }
}