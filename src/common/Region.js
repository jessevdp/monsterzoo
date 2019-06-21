import { ReferenceCity } from './WeatherAPI';

const regions = {
    jungle: {
        id: 1,
        name: 'Jungle',
        referenceCity: ReferenceCity.Rio,
    },
    desert: {
        id: 2,
        name: 'Desert',
        referenceCity: ReferenceCity.Marrakech,
    },
    northPole: {
        id: 3,
        name: 'North-pole',
        referenceCity: ReferenceCity.Amsterdam,
    }
};

const Region = {
    ...regions,
    getAll() {
        return Object.values(regions);
    },
    fromName(name) {
        return Object.values(regions)
            .filter(region => region.name === name)
            .shift();
    }
};

Object.freeze(Region);
export default Region;