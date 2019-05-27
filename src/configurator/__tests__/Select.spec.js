import Select from '../Select';

it('renders correctly', () => {
    const options = [
        { name: 'Foo', value: 'foo' },
        { name: 'Bar', value: 'bar' }
    ];
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
        const options = [
            { name: 'Foo', value: 'foo' },
            { name: 'Bar', value: 'bar' }
        ];
        const select = new Select('name', 'label', options);
        expect(select.state.options).toBe(options);
        select.cleanup();
    })
})