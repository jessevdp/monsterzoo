import renderTemplate from '../renderTemplate';
import Component from '../Component';
import mustache from 'mustache';

jest.mock('mustache');

describe('renderTemplate', () => {
    it('can render a template with data', () => {
        // Arrange
        const template = '<h1>{{ foo }} </h1>';
        const data = { foo: 'bar' };
        const expected = mustache.render(template, data);

        // Act
        const result = renderTemplate(template, data);

        // Assert
        expect(result).toBe(expected);
    })
    
    it('uses mustache.render', () => {
        const template = "template string"
        const data = { foo: 'bar' };
        renderTemplate(template, data);
        expect(mustache.render).toHaveBeenCalledWith(template, data);
    })

    it('defaults [data] param to an empty object', () => {
        const template = "template string"
        renderTemplate(template);
        expect(mustache.render).toHaveBeenCalledWith(template, {});
    })

    describe('usage with Component', () => {
        it('renders a component before outputting it', () => {
            const view = 'some view';
            const template = '{{ component }}'
            const component = new MockComponent(view);
            renderTemplate(template, { component });
            expect(mustache.render).toHaveBeenCalledWith(template, { component: view })
        })
        it('renders components in an array before outputting them', () => {
            const view = 'some view';
            const template = ''
            const components = [new MockComponent(view), new MockComponent(view), new MockComponent(view)];
            const expected = components.map(component => component.render());
            renderTemplate(template, { components });

            expect(mustache.render).toHaveBeenCalledWith(template, { components: expected })
        })
        it('renders nested components before outputting them', () => {
            const view = 'some view';
            const template = ''
            const components = { mock: new MockComponent(view) };
            renderTemplate(template, { components });
            expect(mustache.render).toHaveBeenCalledWith(template, { components: { mock: view }})
        })
    })

    describe('parameter validation', () => {
        it('throws without [template] param', () => {
            expect(() => renderTemplate()).toThrow()
        })
    
        test.each([
            [[]],
            [{}],
            [false],
            [10],
            [null]
        ])('throws when [template] param is not a string (%#)', (param) => {
            expect(() => renderTemplate(param)).toThrow()
        })
    
        test.each([
            [[]],
            ['string'],
            [false],
            [10],
            [null]
        ])('throws when [data] param is not an object (%#)', (param) => {
            expect(() => renderTemplate('template', param)).toThrow()
        })
    })
})

function MockComponent(view = '') {
    this.render = jest.fn(() => view);
    this.view = jest.fn(() => view);
}
MockComponent.prototype = Object.create(Component.prototype);
