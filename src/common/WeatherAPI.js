import config from '@local/config';

const key = config.openWeatherMap.apiKey;
if (!key) throw new Error('The API key for OpenWeatherMap has not been set. (OPEN_WEATHER_MAP_API_KEY)');

class WeatherAPI {
    constructor(key) {
        this._key = key;
    }
}

const weatherAPI = new WeatherAPI(key);
export default weatherAPI;