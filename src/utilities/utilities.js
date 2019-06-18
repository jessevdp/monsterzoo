import {
    isObject,
    isArray,
    isString,
    isNumber,
    isBoolean,
    isFunction
} from './typecheck';

import excludeProperties from './excludeProperties';
import arrayEquals from './arrayEquals';

const utilities = {
    isObject,
    isArray,
    isString,
    isNumber,
    isBoolean,
    isFunction,

    excludeProperties,
    arrayEquals,
};

export default utilities;