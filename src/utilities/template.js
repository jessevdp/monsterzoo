import mustache from 'mustache';

/**
 * Render a template string with a given data object.
 *
 * @export
 * @param {string} template the template string
 * @param {object} [data={}] the view-data object
 * @returns {string} the rendered template populated with the data
 */
export function renderTemplate (template, data = {}) {
    return mustache.render(template, data);
}