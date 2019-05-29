import Configurator from "./Configurator";

describe('isComplete', () => {
    it('returns [true] if everything is set', () => {
        const configurator = new Configurator();
        configurator.setState({ name: 'name' });
        expect(configurator.isComplete()).toBe(true);
        configurator.cleanup();
    })
    it('returns [false] if [name] is not set', () => {
        const configurator = new Configurator();
        configurator.setState({ name: '' });
        expect(configurator.isComplete()).toBe(false);
        configurator.cleanup();
    })
})