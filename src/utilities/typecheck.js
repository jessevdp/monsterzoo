export function isObject (value) {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return (typeof value === 'object');
}