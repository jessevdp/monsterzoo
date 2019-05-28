class BaseType {
    strength() {
        return { min: 0, max: 10 };
    }
}

class WaterType extends BaseType {
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

class FireType extends BaseType {
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

class EarthType extends BaseType {
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

class AirType extends BaseType {
    skinTypes() {
        return ['feathers', 'hair', 'scales'];
    }
    skinColors() {
        return ['purple', 'orange', 'white'];
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

const types = {
    'water': new WaterType(),
    'fire': new FireType(),
    'earth': new EarthType(),
    'air': new AirType(),
}

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
        }
    }
}


export default new Options();