import { renderTemplate } from './template';
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