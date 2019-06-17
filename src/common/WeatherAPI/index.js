import config from '@local/config';
import WeatherAPI from './WeatherAPI';

const key = config.openWeatherMap.apiKey;
if (!key) throw new Error('The API key for OpenWeatherMap has not been set. (OPEN_WEATHER_MAP_API_KEY)');

const weatherAPI = new WeatherAPI(key);
export default weatherAPI;