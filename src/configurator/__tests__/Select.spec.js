import Select from '../Select';

it('renders correctly', () => {
    const options = ['foo', 'bar'];
    const select = new Select('name', 'label', options);
    expect(select.view()).toMatchSnapshot();
    select.cleanup();
})

describe('constructor', () => {
    it('sets the [name] on state', () => {
        const name = 'foobar';
        const select = new Select(name, 'label');
        expect(select.state.name).toBe(name);
        select.cleanup();
    })
    it('sets the [label] on state', () => {
        const label = 'label';
        const select = new Select('name', label);
        expect(select.state.label).toBe(label);
        select.cleanup();
    })
    it('sets the [options] on state', () => {
        const options = ['foo', 'bar'];
        const select = new Select('name', 'label', options);
        expect(select.state.options).toBe(options);
        select.cleanup();
    })
})

describe('[options] setter', () => {
    it('updates the [options] on state', () => {
        const newOptions = ['foo', 'bar'];
        const select = new Select('name', 'label', ['foo']);
        select.options = newOptions;
        expect(select.state.options).toBe(newOptions);
        select.cleanup();
    })
    it ('uses the setState method', () => {
        const newOptions = ['foo', 'bar'];
        const select = new Select('name', 'label', ['foo']);
        const spy = jest.spyOn(Select.prototype, 'setState');
        select.options = newOptions;
        expect(spy).toHaveBeenCalledWith({ options: newOptions });
        select.cleanup();
    })
})

describe('[options] getter', () => {
    it('returns the value of state.options', () => {
        const options = ['foo', 'bar'];
        const select = new Select('name', 'label', options);
        expect(select.options).toBe(options);
        select.cleanup();
    })
})