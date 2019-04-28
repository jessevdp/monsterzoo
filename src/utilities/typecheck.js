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

/**
 * Checks if the value passed is a number.
 * (NaN and Infinity are not considered to be numbers.)
 * @param {*} value
 * @returns {boolean}
 */
export function isNumber(value) {
    if (isNaN(value)) return false;
    if (value == Infinity) return false;
    return typeof value === 'number';
}

/**
 * Checks if the value passed is a boolean
 * @param {*} value
 * @returns {boolean}
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}