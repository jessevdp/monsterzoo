import mustache from 'mustache';
import { isObject, isArray } from '@local/utilities';
import Component from './Component';

/**
 * Render a template string with a given data object.
 *
 * @export
 * @param {string} template the template string
 * @param {object} [data={}] the view-data object
 * @returns {string} the rendered template populated with the data
 */
export default function renderTemplate (template, data = {}) {
    data = renderComponentsInObject(data);
    return mustache.render(template, data);
}

/**
 * Replaces instances of Component with their rendered version
 *
 * @param {object} object
 * @returns {object}
 */
function renderComponentsInObject(object) {
    const newObject = {};
    for (let key in object) {
        const current = object[key];
        if (current instanceof Component) newObject[key] = current.render();
        else if (isObject(current)) newObject[key] = renderComponentsInObject(current);
        else if (isArray(current)) newObject[key] = renderComponentsInArray(current);
        else newObject[key] = object[key];
    }
    return newObject;
}

/**
 * Replaces instances of Component with their rendered version
 *
 * @param {array} array
 * @returns {array}
 */
function renderComponentsInArray(array) {
    return array.map(item => {
        if (item instanceof Component) return item.render();
        else if (isObject(item)) return renderComponentsInObject(item);
        else if (isArray(item)) return renderComponentsInArray(item);
        else return item;
    });
}
