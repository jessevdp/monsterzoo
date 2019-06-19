const regions = {
    jungle: {
        name: 'Jungle',
    },
    desert: {
        name: 'Desert',
    },
    northPole: {
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