import { excludeProperties } from '@local/utilities';

const weatherConditions = {
    'clear': {
        name: 'clear sky',
        match: /^800$/
    },
    'fewClouds': {
        name: 'few clouds',
        match: /^801$/
    },
    'clouds': {
        name: 'clouds',
        match: /^80[2-4]$/
    },
    'rain': {
        name: 'rain',
        match: /^5[01]\d$/
    },
    'showers': {
        name: 'shower rain',
        match: /^52\d$/
    },
    'thunderstorm': {
        name: 'thunderstorm',
        match: /^2\d{2}$/
    },
    'snow': {
        name: 'snow',
        match: /^6\d{2}$/
    },
    'mist': {
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