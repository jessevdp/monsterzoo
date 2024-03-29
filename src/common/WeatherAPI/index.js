import config from '@local/config';

import WeatherAPI from './WeatherAPI';
import ReferenceCity from './ReferenceCity';
import WeatherCondition from './WeatherCondition';

const key = config.openWeatherMap.apiKey;
if (!key) throw new Error('The API key for OpenWeatherMap has not been set. (OPEN_WEATHER_MAP_API_KEY)');

const options = {
    subscriptionInterval: config.openWeatherMap.subscriptionInterval || (60 * 1000),
};

export default new WeatherAPI(key, options);
export {
    ReferenceCity,
    WeatherCondition,
};
