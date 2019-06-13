import BaseOptions from './BaseOptions';

export default class FireOptions extends BaseOptions {
    skinTypes() {
        return ['scales', 'feathers'];
    }
    skinColors() {
        return ['red', 'orange', 'brown'];
    }
    armTypes() {
        return ['tentacles', 'claws', 'claw-wings'];
    }
    armCount() {
        return { min: 0, max: 6 };
    }
    eyeCount() {
        return { min: 0, max: 4 };
    }
    legCount(armCount) {
        return armCount <= 2 ? { min: 0, max: 2 } : { min: 0, max: 0 };
    }
}