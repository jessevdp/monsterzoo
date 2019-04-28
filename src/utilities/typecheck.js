/**
 * Checks if the value passed is an object
 * @param {*} value
 * @returns {boolean}
 */
export function isObject (value) {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return (typeof value === 'object');
}

/**
 * Checks if the value passed is an array
 * @param {*} value
 * @returns {boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * Checks if the value passed is a string
 * @param {*} value
 * @returns {boolean}
 */
export function isString(value) {
    return typeof value === 'string';
}