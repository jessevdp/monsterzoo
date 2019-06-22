import { excludeProperties } from '@local/utilities';

const weatherConditions = {
    'clear': {
        id: 1,
        name: 'clear sky',
        match: /^800$/
    },
    'fewClouds': {
        id: 2,
        name: 'few clouds',
        match: /^801$/
    },
    'clouds': {
        id: 3,
        name: 'clouds',
        match: /^80[2-4]$/
    },
    'rain': {
        id: 4,
        name: 'rain',
        match: /^5[01]\d$/
    },
    'showers': {
        id: 5,
        name: 'shower rain',
        match: /^52\d$/
    },
    'thunderstorm': {
        id: 6,
        name: 'thunderstorm',
        match: /^2\d{2}$/
    },
    'snow': {
        id: 7,
        name: 'snow',
        match: /^6\d{2}$/
    },
    'mist': {
        id: 8,
        name: 'mist',
        match: /^7\d{2}$/
    },
};

const WeatherCondition = {
    ...weatherConditions,
    fromID(id) {
        const condition = Object.values(weatherConditions)
            .filter(condition => condition.match.test(id))
            .shift();
        return excludeProperties(['match'], condition);
    }
};

Object.freeze(WeatherCondition);

export default WeatherCondition;