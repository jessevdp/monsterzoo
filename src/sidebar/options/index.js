import WaterOptions from './WaterOptions';
import FireOptions from './FireOptions';
import EarthOptions from './EarthOptions';
import AirOptions from './AirOptions';

const types = {
    'water': new WaterOptions(),
    'fire': new FireOptions(),
    'earth': new EarthOptions(),
    'air': new AirOptions(),
};

class Options {
    get types() {
        return Object.keys(types);
    }
    for(type) {
        return types[type];
    }
    get defaults() {
        const type = this.types[0];
        const options = this.for(type);
        return {
            type,
            strength: options.strength().min,
            skinType: options.skinTypes()[0],
            skinColor: options.skinColors()[0],
            armType: options.armTypes()[0],
            arms: options.armCount().min,
            eyes: options.eyeCount().min,
            legs: options.legCount(options.armCount().min).min,
        };
    }
}


export default new Options();