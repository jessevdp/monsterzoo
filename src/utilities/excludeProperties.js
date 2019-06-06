/**
 * Clone an object, copying over each property except the specified
 * properties that should be excluded.
 *
 * @export
 * @param {array} properties
 * @param {object} object
 * @returns {object}
 */
export default function excludeProperties(properties, object) {
    const clone = {};
    for (const [prop, value] of Object.entries(object)) {
        if (!properties.includes(prop)) clone[prop] = value;
    }
    return clone;
}