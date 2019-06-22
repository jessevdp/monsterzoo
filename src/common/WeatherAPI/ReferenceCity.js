const referenceCities = {
    'Amsterdam': {
        id: 2759794,
        name: 'Amsterdam',
    },
    'Marrakech': {
        id: 6547285,
        name: 'Marrakech',
    },
    'Rio': {
        id: 3451190,
        name: 'Rio de Janeiro',
    }
};

const ReferenceCity = {
    ...referenceCities,
    fromID(id) {
        return Object.values(referenceCities)
            .filter(city => city.id == id)
            .shift();
    }
};

Object.freeze(ReferenceCity);
export default ReferenceCity;