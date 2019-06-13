import BaseOptions from './BaseOptions';

export default class AirOptions extends BaseOptions {
    skinTypes() {
        return ['feathers', 'hair', 'scales'];
    }
    skinColors() {
        return ['white', 'blue', 'purple'];
    }
    armTypes() {
        return ['wings', 'claw-wings'];
    }
    armCount() {
        return { min: 2, max: 2 };
    }
    eyeCount() {
        return { min: 2, max: 2 };
    }
    legCount() {
        return { min: 0, max: 2, step: 2 };
    }
}