const regions = {
    jungle: {
        id: 1,
        name: 'Jungle',
    },
    desert: {
        id: 2,
        name: 'Desert',
    },
    northPole: {
        id: 3,
        name: 'North-pole',
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