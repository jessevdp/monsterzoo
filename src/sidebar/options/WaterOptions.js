import BaseOptions from './BaseOptions';

export default class WaterOptions extends BaseOptions {
    skinTypes() {
        return ['scales', 'slime'];
    }
    skinColors() {
        return ['blue', 'red', 'green'];
    }
    armTypes() {
        return ['tentacles', 'fins'];
    }
    armCount() {
        return { min: 0, max: 8 };
    }
    eyeCount() {
        return { min: 0, max: 8 };
    }
    legCount(armCount) {
        return armCount <= 4 ? { min: 0, max: 8 } : { min: 0, max: 0 };
    }
}