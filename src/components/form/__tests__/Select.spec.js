import Select from '../Select';
import { Component } from '@local/system';

beforeEach(() => {
    document.body.innerHTML = '';
});

it('renders correctly', () => {
    const options = ['foo', 'bar'];
    const select = new Select('name', 'label', options);
    expect(select.view()).toMatchSnapshot();
    select.cleanup();
})

describe('constructor', () => {
    it('sets the [name] on state', () => {
        const name = 'foobar';
        const select = new Select(name, 'label', ['foo']);
        expect(select.state.name).toBe(name);
        select.cleanup();
    })
    it('sets the [label] on state', () => {
        const label = 'label';
        const select = new Select('name', label, ['foo']);
        expect(select.state.label).toBe(label);
        select.cleanup();
    })
    it('sets the [options] on state', () => {
        const options = ['foo', 'bar'];
        const select = new Select('name', 'label', options);
        expect(select.state.options).toBe(options);
        select.cleanup();
    })
    it('defaults the [value] to the first option', () => {
        const options = ['foo', 'bar'];
        const expected = options[0];
        const select = new Select('name', 'label', options);
        expect(select.state.value).toBe(expected);
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
    it('uses the setState method', () => {
        const newOptions = ['foo', 'bar'];
        const select = new Select('name', 'label', ['foo']);
        const spy = jest.spyOn(Component.prototype, 'setState');
        select.options = newOptions;
        expect(spy).toHaveBeenCalled();
        select.cleanup();
    })
    describe('when the current [value] is not present in the new [options]', () => {
        it('defaults the [value] to the first option', () => {
            // Arrange
            const options = ['baz', 'derp'];
            const newOptions = ['foo', 'bar'];
            const select = new Select('name', 'label', options);
            select.value = options[0];

            // Act
            select.options = newOptions;

            // Assert
            expect(select.state.value).toBe(newOptions[0]);

            // Cleanup
            select.cleanup();
        })
    })
    describe('when the current [value] is present in the new [options]', () => {
        it('keeps the selected value', () => {
            // Arrange
            const options = ['foo', 'bar'];
            const value = options[0];
            const newOptions = ['baz', 'bar', value];
            const select = new Select('name', 'label', options);
            select.value = value;

            // Act
            select.options = newOptions;

            // Assert
            expect(select.state.value).toBe(value);

            // Cleanup
            select.cleanup();
        })
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

describe('[value] setter', () => {
    it('updates the [value] variable on state', () => {
        const options = ['foo', 'bar'];
        const newValue = options[1];
        const select = new Select('name', 'label', options);
        select.value = newValue;
        expect(select.state.value).toBe(newValue);
        select.cleanup();
    })
    it('updates the selected value of the input box', () => {
        const options = ['foo', 'bar'];
        const newValue = options[1];
        const select = new Select('name', 'label', options);
        document.body.innerHTML = select.render();
        select.value = newValue;
        const $select = document.querySelector('select');
        expect($select.value).toBe(newValue);
        select.cleanup();
    })
    it('uses the setState method', () => {
        const options = ['foo', 'bar'];
        const value = options[1];
        const select = new Select('name', 'label', options);
        const spy = jest.spyOn(Component.prototype, 'setState');
        select.value = value;
        expect(spy).toHaveBeenCalled();
        select.cleanup();
    })
    describe('when the new value is not present in the set of options', () => {
        it('throws a RangeError', () => {
            const options = ['foo', 'bar'];
            const newValue = 'baz';
            const select = new Select('name', 'label', options);
            expect(() => {
                select.value = newValue;
            })
            .toThrowError(RangeError);
            select.cleanup();
        })
    })
})

describe('[value] getter', () => {
    it('returns the value of state.value', () => {
        const options = ['foo', 'bar'];
        const value = options[1];
        const select = new Select('name', 'label', options);
        select.state.value = value;
        expect(select.value).toBe(value);
        select.cleanup();
    })
})

describe('events', () => {
    it('updates [value] state when the value of the select box changes', () => {
        // Arrange
        const options = ['foo', 'bar'];
        const newValue = options[1];
        const select = new Select('name', 'label', options);
        document.body.innerHTML = select.render();
        const $select = document.querySelector('select');

        // Act
        $select.value = newValue;
        $select.dispatchEvent(new Event('change'));

        // Assert
        expect(select.state.value).toBe(newValue);

        // Cleanup
        select.cleanup();
    })
})

describe('isDisabled', () => {
    test.each([
        [[]],
        [['1']],
    ])('returns [true] if there is less than 2 options (%p)', options => {
        const select = new Select('name', 'label', options);
        expect(select.isDisabled()).toBe(true);
        select.cleanup();
    })
    test.each([
        [['1', '2']],
        [['1', '2', '3', '4']],
    ])('returns [false] if there are than 2 or more options (%p)', options => {
        const select = new Select('name', 'label', options);
        expect(select.isDisabled()).toBe(false);
        select.cleanup();
    })
})