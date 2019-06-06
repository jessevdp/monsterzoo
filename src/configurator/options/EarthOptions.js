import BaseOptions from './BaseOptions';

export default class EarthOptions extends BaseOptions {
    skinTypes() {
        return ['hair', 'scales', 'slime'];
    }
    skinColors() {
        return ['purple', 'orange', 'white'];
    }
    armTypes() {
        return ['claws'];
    }
    armCount() {
        return { min: 2, max: 2 };
    }
    eyeCount() {
        return { min: 2, max: 2 };
    }
    legCount() {
        return { min: 2, max: 6, step: 2 };
    }
}